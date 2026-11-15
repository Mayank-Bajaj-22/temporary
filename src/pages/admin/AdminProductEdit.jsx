import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Upload, 
  X, 
  AlertCircle, 
  TreePine,
  ExternalLink,
  Loader2
} from 'lucide-react';
import { useProducts } from '../../context/ProductContext';
import { uploadProductImage } from '../../services/productService';
import Button from '../../components/ui/Button';

// Utility helper to slugify
const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
};

export default function AdminProductEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { categories, getProductById, updateProduct, products, loading: productsLoading } = useProducts();

  const product = getProductById(id);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    categorySlug: '',
    description: '',
    woodType: '',
    dimensions: '',
    finish: '',
    weight: '',
    craftNote: '',
    featured: false,
    isNewArrival: false,
    available: true,
  });

  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState('');

  // Pre-fill form when product is loaded
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        slug: product.slug || '',
        categorySlug: product.categorySlug || categories[0]?.slug || 'scalloped-serveware',
        description: product.description || '',
        woodType: product.details?.woodType || '',
        dimensions: product.details?.dimensions || '',
        finish: product.details?.finish || '',
        weight: product.details?.weight || '',
        craftNote: product.details?.craftNote || '',
        featured: Boolean(product.featured),
        isNewArrival: Boolean(product.isNewArrival),
        available: product.available !== undefined ? Boolean(product.available) : true,
      });

      if (product.images?.[0]) {
        setPreviewUrl(product.images[0]);
      }
    }
  }, [product, categories]);

  // Cleanup object URL on unmount
  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  // Loading state
  if (productsLoading && !product) {
    return (
      <div className="py-20 text-center max-w-md mx-auto">
        <div className="w-10 h-10 rounded-full border-2 border-[#76501F] border-t-transparent animate-spin mx-auto mb-3" />
        <p className="text-xs text-[#777166]">Retrieving piece from Supabase...</p>
      </div>
    );
  }

  // If product not found
  if (!product) {
    return (
      <div className="py-20 text-center max-w-md mx-auto">
        <TreePine className="w-16 h-16 text-[#76501F]/40 mx-auto mb-3" />
        <h2 className="font-serif text-2xl text-[#281A10]">Product Not Found</h2>
        <p className="text-xs text-[#777166] mt-1 mb-6">
          The product ID "{id}" does not exist in the active catalogue.
        </p>
        <Button to="/admin/products" variant="primary" icon={ArrowLeft}>
          Return to Products List
        </Button>
      </div>
    );
  }

  // Local image file selection with Object URL
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setGeneralError('File exceeds size limit: Please choose an image smaller than 5 MB.');
        return;
      }
      setGeneralError('');
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
      const newUrl = URL.createObjectURL(file);
      setImageFile(file);
      setPreviewUrl(newUrl);
    }
  };

  // Form Validation
  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Product name is required';
    if (!formData.slug.trim()) errs.slug = 'Slug is required';
    if (!formData.description.trim()) errs.description = 'Description is required';

    // Check duplicate slug (excluding self)
    const duplicate = products.some(
      (p) => String(p.id) !== String(product.id) && p.slug.toLowerCase() === formData.slug.toLowerCase()
    );
    if (duplicate) {
      errs.slug = `Slug "/${formData.slug}" is already in use by another piece`;
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError('');
    if (!validate()) return;

    try {
      setSaving(true);

      let finalImages = product.images;

      // If a replacement image was selected, upload it to Supabase Storage
      if (imageFile) {
        try {
          const uploadedUrl = await uploadProductImage(imageFile);
          finalImages = [uploadedUrl];
        } catch (uploadErr) {
          console.error('Storage replacement upload failed:', uploadErr);
          setGeneralError(`Image upload failed: ${uploadErr.message}. Changes were not saved.`);
          setSaving(false);
          return;
        }
      }

      const matchedCategory = categories.find((c) => c.slug === formData.categorySlug);

      const updatedPayload = {
        name: formData.name.trim(),
        slug: formData.slug.trim(),
        category: matchedCategory ? matchedCategory.name : product.category,
        categorySlug: formData.categorySlug,
        categoryId: matchedCategory?.id || product.categoryId || null,
        description: formData.description.trim(),
        details: {
          woodType: formData.woodType.trim(),
          dimensions: formData.dimensions.trim(),
          finish: formData.finish.trim(),
          weight: formData.weight.trim(),
          craftNote: formData.craftNote.trim(),
        },
        images: finalImages,
        featured: formData.featured,
        isNewArrival: formData.isNewArrival,
        available: formData.available,
      };

      await updateProduct(product.id, updatedPayload);
      navigate('/admin/products');
    } catch (err) {
      console.error('Failed to update product:', err);
      setGeneralError(err.message || 'Failed to update product in database.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top back link and header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link
            to="/admin/products"
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#76501F] hover:text-[#281A10] transition-colors mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Products</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-serif text-[#281A10]">
            Edit Portfolio Piece
          </h1>
          <p className="text-xs sm:text-sm text-[#777166] mt-0.5">
            Editing details for <strong className="text-[#29251F] font-semibold">{product.name}</strong>
          </p>
        </div>

        <Link
          to={`/products/${product.slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#76501F] hover:text-[#281A10]"
        >
          <span>View Public Page</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>

      {generalError && (
        <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <strong className="block font-semibold">Could not update product</strong>
            <p>{generalError}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information Card */}
        <div className="bg-white p-6 rounded-xl border border-[#E8E3D9] shadow-xs space-y-5">
          <h2 className="font-serif text-lg text-[#281A10] border-b border-[#E8E3D9] pb-3">
            Core Details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Product Name */}
            <div>
              <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-[#29251F] mb-1">
                Product Name <span className="text-rose-600">*</span>
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full px-3.5 py-2.5 bg-[#F7F5F0] border rounded-sm text-sm text-[#29251F] focus:outline-none transition-colors ${
                  errors.name ? 'border-rose-500 bg-rose-50/30' : 'border-[#E8E3D9] focus:border-[#76501F]'
                }`}
              />
              {errors.name && <p className="text-xs text-rose-600 mt-1">{errors.name}</p>}
            </div>

            {/* URL Slug */}
            <div>
              <label htmlFor="slug" className="block text-xs font-semibold uppercase tracking-wider text-[#29251F] mb-1">
                URL Slug <span className="text-rose-600">*</span>
              </label>
              <input
                type="text"
                id="slug"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: slugify(e.target.value) })}
                className={`w-full px-3.5 py-2.5 bg-[#F7F5F0] border rounded-sm text-sm text-[#29251F] focus:outline-none transition-colors ${
                  errors.slug ? 'border-rose-500 bg-rose-50/30' : 'border-[#E8E3D9] focus:border-[#76501F]'
                }`}
              />
              {errors.slug && <p className="text-xs text-rose-600 mt-1">{errors.slug}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Category Dropdown */}
            <div>
              <label htmlFor="category" className="block text-xs font-semibold uppercase tracking-wider text-[#29251F] mb-1">
                Collection Category <span className="text-rose-600">*</span>
              </label>
              <select
                id="category"
                value={formData.categorySlug}
                onChange={(e) => setFormData({ ...formData, categorySlug: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#F7F5F0] border border-[#E8E3D9] focus:border-[#76501F] rounded-sm text-sm text-[#29251F] focus:outline-none transition-colors"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-xs font-semibold uppercase tracking-wider text-[#29251F] mb-1">
              Description <span className="text-rose-600">*</span>
            </label>
            <textarea
              id="description"
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className={`w-full px-3.5 py-2.5 bg-[#F7F5F0] border rounded-sm text-sm text-[#29251F] focus:outline-none transition-colors ${
                errors.description ? 'border-rose-500 bg-rose-50/30' : 'border-[#E8E3D9] focus:border-[#76501F]'
              }`}
            />
            {errors.description && <p className="text-xs text-rose-600 mt-1">{errors.description}</p>}
          </div>
        </div>

        {/* Artisanal Specifications Card */}
        <div className="bg-white p-6 rounded-xl border border-[#E8E3D9] shadow-xs space-y-4">
          <h2 className="font-serif text-lg text-[#281A10] border-b border-[#E8E3D9] pb-3">
            Specifications & Materials
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="woodType" className="block text-xs font-semibold uppercase tracking-wider text-[#29251F] mb-1">
                Materials & Wood Species
              </label>
              <input
                type="text"
                id="woodType"
                value={formData.woodType}
                onChange={(e) => setFormData({ ...formData, woodType: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#F7F5F0] border border-[#E8E3D9] rounded-sm text-sm text-[#29251F] focus:border-[#76501F] focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="dimensions" className="block text-xs font-semibold uppercase tracking-wider text-[#29251F] mb-1">
                Dimensions
              </label>
              <input
                type="text"
                id="dimensions"
                value={formData.dimensions}
                onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#F7F5F0] border border-[#E8E3D9] rounded-sm text-sm text-[#29251F] focus:border-[#76501F] focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="finish" className="block text-xs font-semibold uppercase tracking-wider text-[#29251F] mb-1">
                Surface Treatment
              </label>
              <input
                type="text"
                id="finish"
                value={formData.finish}
                onChange={(e) => setFormData({ ...formData, finish: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#F7F5F0] border border-[#E8E3D9] rounded-sm text-sm text-[#29251F] focus:border-[#76501F] focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="weight" className="block text-xs font-semibold uppercase tracking-wider text-[#29251F] mb-1">
                Approx. Weight
              </label>
              <input
                type="text"
                id="weight"
                value={formData.weight}
                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#F7F5F0] border border-[#E8E3D9] rounded-sm text-sm text-[#29251F] focus:border-[#76501F] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Image Selection with Supabase Storage Integration */}
        <div className="bg-white p-6 rounded-xl border border-[#E8E3D9] shadow-xs space-y-4">
          <h2 className="font-serif text-lg text-[#281A10] border-b border-[#E8E3D9] pb-3">
            Product Imagery (Supabase Storage)
          </h2>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-32 h-32 rounded-xl bg-[#F7F5F0] border border-[#E8E3D9] overflow-hidden flex items-center justify-center shrink-0">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center p-3 text-[#777166]">
                  <TreePine className="w-8 h-8 mx-auto text-[#76501F]/50 mb-1" />
                  <span className="text-[10px] block">No image</span>
                </div>
              )}
            </div>

            <div className="flex-1 space-y-2">
              <label
                htmlFor="imageInputEdit"
                className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 bg-[#F7F5F0] hover:bg-[#E8E3D9] text-[#29251F] text-xs font-semibold uppercase tracking-wider rounded-sm border border-[#E8E3D9] transition-colors"
              >
                <Upload className="w-4 h-4 text-[#76501F]" />
                <span>Replace Image File</span>
              </label>
              <input
                type="file"
                id="imageInputEdit"
                accept="image/jpeg,image/png,image/webp,image/avif"
                onChange={handleImageChange}
                className="hidden"
              />
              <p className="text-[11px] text-[#777166]">
                Selecting a replacement file uploads to the Supabase <code>product-images</code> bucket upon saving.
              </p>
            </div>
          </div>
        </div>

        {/* Toggles Card */}
        <div className="bg-white p-6 rounded-xl border border-[#E8E3D9] shadow-xs space-y-4">
          <h2 className="font-serif text-lg text-[#281A10] border-b border-[#E8E3D9] pb-3">
            Visibility & Badges
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <label className="flex items-center gap-3 p-3 bg-[#F7F5F0] rounded-lg border border-[#E8E3D9] cursor-pointer">
              <input
                type="checkbox"
                checked={formData.available}
                onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
                className="w-4 h-4 text-[#76501F] rounded-xs"
              />
              <div>
                <span className="text-xs font-semibold text-[#29251F] block">Available to Commission</span>
                <span className="text-[10px] text-[#777166]">Visible in active studio catalogue</span>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 bg-[#F7F5F0] rounded-lg border border-[#E8E3D9] cursor-pointer">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="w-4 h-4 text-[#76501F] rounded-xs"
              />
              <div>
                <span className="text-xs font-semibold text-[#29251F] block">Portfolio Highlight</span>
                <span className="text-[10px] text-[#777166]">Display in featured sections</span>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 bg-[#F7F5F0] rounded-lg border border-[#E8E3D9] cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isNewArrival}
                onChange={(e) => setFormData({ ...formData, isNewArrival: e.target.checked })}
                className="w-4 h-4 text-[#76501F] rounded-xs"
              />
              <div>
                <span className="text-xs font-semibold text-[#29251F] block">New Turning</span>
                <span className="text-[10px] text-[#777166]">Display with 'New' banner</span>
              </div>
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Button
            to="/admin/products"
            variant="ghost"
            size="md"
            disabled={saving}
          >
            Cancel
          </Button>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[#281A10] text-[#F7F5F0] hover:bg-[#76501F] text-xs font-semibold uppercase tracking-wider rounded-sm shadow-xs transition-colors disabled:opacity-60"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Updating in Supabase...</span>
              </>
            ) : (
              <span>Save Changes to Portfolio</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
