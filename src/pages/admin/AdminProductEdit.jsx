
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Upload,
  X,
  AlertCircle,
  TreePine,
  ExternalLink,
  Loader2,
  ImagePlus,
} from 'lucide-react';
import { useProducts } from '../../context/ProductContext';
import { uploadProductImage } from '../../services/productService';
import Button from '../../components/ui/Button';

const slugify = (text) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');

export default function AdminProductEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    categories,
    getProductById,
    updateProduct,
    products,
    loading: productsLoading,
  } = useProducts();

  const product = getProductById(id);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    categorySlug: '',
    description: '',
    featured: false,
    isNewArrival: false,
    available: true,
  });

  // Existing images saved in Supabase
  const [existingImages, setExistingImages] = useState([]);

  // Newly selected image files
  const [imageFiles, setImageFiles] = useState([]);

  // Local preview URLs for newly selected files
  const [newPreviews, setNewPreviews] = useState([]);

  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState('');

  // Load product details
  useEffect(() => {
    if (!product) return;

    setFormData({
      name: product.name || '',
      slug: product.slug || '',
      categorySlug:
        product.categorySlug || categories[0]?.slug || '',
      description: product.description || '',
      featured: Boolean(product.featured),
      isNewArrival: Boolean(product.isNewArrival),
      available:
        product.available !== undefined
          ? Boolean(product.available)
          : true,
    });

    setExistingImages(product.images || []);
  }, [product, categories]);

  // Cleanup local preview URLs
  useEffect(() => {
    return () => {
      newPreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [newPreviews]);

  // Loading state
  if (productsLoading && !product) {
    return (
      <div className="py-20 text-center max-w-md mx-auto">
        <div className="w-10 h-10 rounded-full border-2 border-[#76501F] border-t-transparent animate-spin mx-auto mb-3" />
        <p className="text-xs text-[#777166]">
          Retrieving piece from Supabase...
        </p>
      </div>
    );
  }

  // Product not found
  if (!product) {
    return (
      <div className="py-20 text-center max-w-md mx-auto">
        <TreePine className="w-16 h-16 text-[#76501F]/40 mx-auto mb-3" />
        <h2 className="font-serif text-2xl text-[#281A10]">
          Product Not Found
        </h2>
        <p className="text-xs text-[#777166] mt-1 mb-6">
          The product ID "{id}" does not exist in the active catalogue.
        </p>
        <Button to="/admin/products" variant="primary" icon={ArrowLeft}>
          Return to Products List
        </Button>
      </div>
    );
  }

  // Select multiple images
  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files || []);

    if (!selectedFiles.length) return;

    const validTypes = [
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/avif',
    ];

    const invalidFile = selectedFiles.find(
      (file) => !validTypes.includes(file.type)
    );

    if (invalidFile) {
      setGeneralError(
        'Only JPEG, PNG, WebP and AVIF images are allowed.'
      );
      e.target.value = '';
      return;
    }

    const oversizedFile = selectedFiles.find(
      (file) => file.size > 5 * 1024 * 1024
    );

    if (oversizedFile) {
      setGeneralError(
        'Each image must be smaller than 5 MB.'
      );
      e.target.value = '';
      return;
    }

    setGeneralError('');

    const newFiles = [...imageFiles, ...selectedFiles];
    const newUrls = selectedFiles.map((file) =>
      URL.createObjectURL(file)
    );

    setImageFiles(newFiles);
    setNewPreviews((prev) => [...prev, ...newUrls]);

    // Allow selecting the same file again later
    e.target.value = '';
  };

  // Remove an existing Supabase image
  const removeExistingImage = (index) => {
    setExistingImages((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  // Remove a newly selected image
  const removeNewImage = (index) => {
    URL.revokeObjectURL(newPreviews[index]);

    setImageFiles((prev) =>
      prev.filter((_, i) => i !== index)
    );

    setNewPreviews((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  // Validation
  const validate = () => {
    const errs = {};

    if (!formData.name.trim()) {
      errs.name = 'Product name is required';
    }

    if (!formData.slug.trim()) {
      errs.slug = 'Slug is required';
    }

    if (!formData.description.trim()) {
      errs.description = 'Description is required';
    }

    if (existingImages.length + imageFiles.length === 0) {
      errs.images = 'Please keep or upload at least one product image.';
    }

    const duplicate = products.some(
      (p) =>
        String(p.id) !== String(product.id) &&
        p.slug.toLowerCase() === formData.slug.toLowerCase()
    );

    if (duplicate) {
      errs.slug = `Slug "/${formData.slug}" is already in use.`;
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Save product
  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError('');

    if (!validate()) return;

    try {
      setSaving(true);

      // Upload all newly selected images
      let uploadedUrls = [];

      if (imageFiles.length > 0) {
        uploadedUrls = await Promise.all(
          imageFiles.map((file) => uploadProductImage(file))
        );
      }

      // Keep existing images + newly uploaded images
      const finalImages = [
        ...existingImages,
        ...uploadedUrls,
      ];

      const matchedCategory = categories.find(
        (c) => c.slug === formData.categorySlug
      );

      const updatedPayload = {
        name: formData.name.trim(),
        slug: formData.slug.trim(),
        category: matchedCategory
          ? matchedCategory.name
          : product.category,
        categorySlug: formData.categorySlug,
        categoryId:
          matchedCategory?.id || product.categoryId || null,
        description: formData.description.trim(),
        images: finalImages,
        featured: formData.featured,
        isNewArrival: formData.isNewArrival,
        available: formData.available,
      };

      await updateProduct(product.id, updatedPayload);

      navigate('/admin/products');
    } catch (err) {
      console.error('Failed to update product:', err);
      setGeneralError(
        err.message || 'Failed to update product in database.'
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
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
            Editing details for{' '}
            <strong className="text-[#29251F]">
              {product.name}
            </strong>
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

      {/* Error */}
      {generalError && (
        <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <strong className="block font-semibold">
              Could not update product
            </strong>
            <p>{generalError}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Core Details */}
        <div className="bg-white p-6 rounded-xl border border-[#E8E3D9] shadow-xs space-y-5">
          <h2 className="font-serif text-lg text-[#281A10] border-b border-[#E8E3D9] pb-3">
            Core Details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-[#29251F] mb-1">
                Product Name *
              </label>

              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  })
                }
                className="w-full px-3.5 py-2.5 bg-[#F7F5F0] border border-[#E8E3D9] rounded-sm text-sm focus:outline-none focus:border-[#76501F]"
              />

              {errors.name && (
                <p className="text-xs text-rose-600 mt-1">
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="slug" className="block text-xs font-semibold uppercase tracking-wider text-[#29251F] mb-1">
                URL Slug *
              </label>

              <input
                id="slug"
                type="text"
                value={formData.slug}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    slug: slugify(e.target.value),
                  })
                }
                className="w-full px-3.5 py-2.5 bg-[#F7F5F0] border border-[#E8E3D9] rounded-sm text-sm focus:outline-none focus:border-[#76501F]"
              />

              {errors.slug ? (
                <p className="text-xs text-rose-600 mt-1">
                  {errors.slug}
                </p>
              ) : (
                <p className="text-[11px] text-[#777166] mt-1">
                  Public URL: /products/{formData.slug}
                </p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="category" className="block text-xs font-semibold uppercase tracking-wider text-[#29251F] mb-1">
              Collection Category *
            </label>

            <select
              id="category"
              value={formData.categorySlug}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  categorySlug: e.target.value,
                })
              }
              className="w-full px-3.5 py-2.5 bg-[#F7F5F0] border border-[#E8E3D9] rounded-sm text-sm focus:outline-none focus:border-[#76501F]"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="description" className="block text-xs font-semibold uppercase tracking-wider text-[#29251F] mb-1">
              Description *
            </label>

            <textarea
              id="description"
              rows={3}
              value={formData.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: e.target.value,
                })
              }
              className="w-full px-3.5 py-2.5 bg-[#F7F5F0] border border-[#E8E3D9] rounded-sm text-sm focus:outline-none focus:border-[#76501F]"
            />

            {errors.description && (
              <p className="text-xs text-rose-600 mt-1">
                {errors.description}
              </p>
            )}
          </div>
        </div>

        {/* Multiple Product Images */}
        <div className="bg-white p-6 rounded-xl border border-[#E8E3D9] shadow-xs space-y-4">
          <h2 className="font-serif text-lg text-[#281A10] border-b border-[#E8E3D9] pb-3">
            Product Images
          </h2>

          <p className="text-xs text-[#777166]">
            Add multiple product photos. You can keep existing images,
            remove unwanted ones, or upload new images.
          </p>

          {/* Image Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {existingImages.map((url, index) => (
              <div
                key={`existing-${index}`}
                className="relative aspect-square rounded-xl overflow-hidden border border-[#E8E3D9] group"
              >
                <img
                  src={url}
                  alt={`Product ${index + 1}`}
                  className="w-full h-full object-cover"
                />

                <button
                  type="button"
                  onClick={() => removeExistingImage(index)}
                  className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/95 text-rose-600 flex items-center justify-center shadow hover:bg-rose-50"
                  aria-label="Remove image"
                >
                  <X className="w-4 h-4" />
                </button>

                <span className="absolute bottom-2 left-2 text-[9px] bg-black/60 text-white px-2 py-1 rounded">
                  Saved
                </span>
              </div>
            ))}

            {newPreviews.map((url, index) => (
              <div
                key={`new-${index}`}
                className="relative aspect-square rounded-xl overflow-hidden border border-[#B69A63]"
              >
                <img
                  src={url}
                  alt={`New product ${index + 1}`}
                  className="w-full h-full object-cover"
                />

                <button
                  type="button"
                  onClick={() => removeNewImage(index)}
                  className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/95 text-rose-600 flex items-center justify-center shadow hover:bg-rose-50"
                  aria-label="Remove image"
                >
                  <X className="w-4 h-4" />
                </button>

                <span className="absolute bottom-2 left-2 text-[9px] bg-[#76501F] text-white px-2 py-1 rounded">
                  New
                </span>
              </div>
            ))}
          </div>

          {/* Upload Button */}
          <div>
            <label
              htmlFor="imageInputEdit"
              className="cursor-pointer inline-flex items-center gap-2 px-4 py-3 bg-[#F7F5F0] hover:bg-[#E8E3D9] text-[#29251F] text-xs font-semibold uppercase tracking-wider rounded-sm border border-[#E8E3D9] transition-colors"
            >
              <ImagePlus className="w-4 h-4 text-[#76501F]" />
              Add More Images
            </label>

            <input
              type="file"
              id="imageInputEdit"
              accept="image/jpeg,image/png,image/webp,image/avif"
              multiple
              onChange={handleImageChange}
              className="hidden"
            />

            <p className="text-[11px] text-[#777166] mt-2">
              JPEG, PNG, WebP or AVIF. Maximum 5 MB per image.
            </p>

            {errors.images && (
              <p className="text-xs text-rose-600 mt-2">
                {errors.images}
              </p>
            )}
          </div>
        </div>

        {/* Visibility */}
        <div className="bg-white p-6 rounded-xl border border-[#E8E3D9] shadow-xs space-y-4">
          <h2 className="font-serif text-lg text-[#281A10] border-b border-[#E8E3D9] pb-3">
            Visibility & Badges
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <label className="flex items-center gap-3 p-3 bg-[#F7F5F0] rounded-lg border border-[#E8E3D9] cursor-pointer">
              <input
                type="checkbox"
                checked={formData.available}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    available: e.target.checked,
                  })
                }
                className="w-4 h-4"
              />
              <span className="text-xs font-semibold text-[#29251F]">
                Available to Commission
              </span>
            </label>

            <label className="flex items-center gap-3 p-3 bg-[#F7F5F0] rounded-lg border border-[#E8E3D9] cursor-pointer">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    featured: e.target.checked,
                  })
                }
                className="w-4 h-4"
              />
              <span className="text-xs font-semibold text-[#29251F]">
                Portfolio Highlight
              </span>
            </label>

            <label className="flex items-center gap-3 p-3 bg-[#F7F5F0] rounded-lg border border-[#E8E3D9] cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isNewArrival}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    isNewArrival: e.target.checked,
                  })
                }
                className="w-4 h-4"
              />
              <span className="text-xs font-semibold text-[#29251F]">
                New Turning
              </span>
            </label>
          </div>
        </div>

        {/* Actions */}
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
                Saving Images & Product...
              </>
            ) : (
              'Save Changes to Portfolio'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
