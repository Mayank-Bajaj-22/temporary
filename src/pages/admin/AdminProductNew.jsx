import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Upload,
  X,
  AlertCircle,
  TreePine,
  Loader2,
  ImagePlus,
} from 'lucide-react';

import { useProducts } from '../../context/ProductContext';
import { uploadProductImage } from '../../services/productService';
import Button from '../../components/ui/Button';

// Convert product name into URL-friendly slug
const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
};

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const VALID_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/avif',
];

export default function AdminProductNew() {
  const { categories, addProduct, products } = useProducts();

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    categorySlug: '',
    description: '',
    featured: false,
    isNewArrival: true,
    available: true,
  });

  const [selectedImages, setSelectedImages] = useState([]);
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState('');

  const imageUrlsRef = useRef(new Set());

  // Set the first available category when categories load
  useEffect(() => {
    if (!categories.length) return;

    setFormData((prev) => {
      const categoryExists = categories.some(
        (category) => category.slug === prev.categorySlug
      );

      if (categoryExists) return prev;

      return {
        ...prev,
        categorySlug: categories[0].slug,
      };
    });
  }, [categories]);

  // Cleanup preview URLs when component unmounts
  useEffect(() => {
    return () => {
      imageUrlsRef.current.forEach((url) => {
        URL.revokeObjectURL(url);
      });

      imageUrlsRef.current.clear();
    };
  }, []);

  // Product name and automatic slug
  const handleNameChange = (e) => {
    const newName = e.target.value;

    setFormData((prev) => ({
      ...prev,
      name: newName,
      slug: isSlugManuallyEdited ? prev.slug : slugify(newName),
    }));
  };

  // Manual slug editing
  const handleSlugChange = (e) => {
    setIsSlugManuallyEdited(true);

    setFormData((prev) => ({
      ...prev,
      slug: slugify(e.target.value),
    }));
  };

  // Select multiple images
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []);

    if (!files.length) return;

    setGeneralError('');

    const validFiles = [];

    for (const file of files) {
      if (!VALID_TYPES.includes(file.type)) {
        setGeneralError(
          `${file.name}: Please select JPEG, PNG, WebP or AVIF images.`
        );
        continue;
      }

      if (file.size > MAX_FILE_SIZE) {
        setGeneralError(
          `${file.name}: Image must be smaller than 5 MB.`
        );
        continue;
      }

      validFiles.push(file);
    }

    if (validFiles.length) {
      const newImages = validFiles.map((file) => {
        const previewUrl = URL.createObjectURL(file);

        imageUrlsRef.current.add(previewUrl);

        return {
          file,
          previewUrl,
        };
      });

      setSelectedImages((prev) => [...prev, ...newImages]);
    }

    // Allow selecting the same image again
    e.target.value = '';
  };

  // Remove a selected image
  const removeImage = (index) => {
    setSelectedImages((prev) => {
      const imageToRemove = prev[index];

      if (imageToRemove) {
        URL.revokeObjectURL(imageToRemove.previewUrl);
        imageUrlsRef.current.delete(imageToRemove.previewUrl);
      }

      return prev.filter((_, i) => i !== index);
    });
  };

  // Validate form
  const validate = () => {
    const errs = {};

    if (!formData.name.trim()) {
      errs.name = 'Product name is required';
    }

    if (!formData.slug.trim()) {
      errs.slug = 'Slug is required';
    }

    if (!formData.categorySlug) {
      errs.category = 'Please select a category';
    }

    if (!formData.description.trim()) {
      errs.description = 'Description is required';
    }

    const duplicate = products.some(
      (product) =>
        product.slug?.toLowerCase() === formData.slug.toLowerCase()
    );

    if (duplicate) {
      errs.slug = `Slug "/${formData.slug}" is already in use.`;
    }

    setErrors(errs);

    return Object.keys(errs).length === 0;
  };

  // Upload all images and save product
  const handleSubmit = async (e) => {
    e.preventDefault();

    setGeneralError('');

    if (!validate()) return;

    try {
      setSaving(true);

      // Upload all selected images to Supabase Storage
      let imageUrls = [
        '/images/buddhahome/walnut-scalloped-serving-collection.png',
      ];

      if (selectedImages.length > 0) {
        imageUrls = await Promise.all(
          selectedImages.map(({ file }) => uploadProductImage(file))
        );
      }

      const matchedCategory = categories.find(
        (category) => category.slug === formData.categorySlug
      );

      if (!matchedCategory) {
        throw new Error('Please select a valid product category.');
      }

      const productPayload = {
        name: formData.name.trim(),
        slug: formData.slug.trim(),
        category: matchedCategory.name,
        categorySlug: matchedCategory.slug,
        categoryId: matchedCategory.id || null,
        description: formData.description.trim(),
        images: imageUrls,
        featured: formData.featured,
        isNewArrival: formData.isNewArrival,
        available: formData.available,
      };

      await addProduct(productPayload);

      // Revoke all preview URLs
      imageUrlsRef.current.forEach((url) => {
        URL.revokeObjectURL(url);
      });

      imageUrlsRef.current.clear();

      // Reset form
      setFormData({
        name: '',
        slug: '',
        categorySlug: categories[0]?.slug || '',
        description: '',
        featured: false,
        isNewArrival: true,
        available: true,
      });

      setSelectedImages([]);
      setIsSlugManuallyEdited(false);
      setErrors({});
      setGeneralError('');

      alert('Product successfully uploaded!');

    } catch (err) {
      console.error('Failed to save product:', err);
      setGeneralError(
        err.message || 'Failed to save product.'
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">

      {/* Header */}
      <div>
        <Link
          to="/admin/products"
          className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#76501F] hover:text-[#281A10] transition-colors mb-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Products</span>
        </Link>

        <h1 className="text-2xl sm:text-3xl font-serif text-[#281A10]">
          Add New Portfolio Product
        </h1>

        <p className="text-xs sm:text-sm text-[#777166] mt-1">
          Create a new handcrafted piece in the BuddhaHome studio catalogue.
        </p>
      </div>

      {/* Error */}
      {generalError && (
        <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />

          <div>
            <strong className="block font-semibold">
              Could not save product
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

            {/* Product Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-xs font-semibold uppercase tracking-wider text-[#29251F] mb-1"
              >
                Product Name <span className="text-rose-600">*</span>
              </label>

              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleNameChange}
                placeholder="e.g. Scalloped Teak Platter"
                className={`w-full px-3.5 py-2.5 bg-[#F7F5F0] border rounded-sm text-sm text-[#29251F] focus:outline-none transition-colors ${
                  errors.name
                    ? 'border-rose-500 bg-rose-50/30'
                    : 'border-[#E8E3D9] focus:border-[#76501F]'
                }`}
              />

              {errors.name && (
                <p className="text-xs text-rose-600 mt-1">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Slug */}
            <div>
              <label
                htmlFor="slug"
                className="block text-xs font-semibold uppercase tracking-wider text-[#29251F] mb-1"
              >
                URL Slug <span className="text-rose-600">*</span>
              </label>

              <input
                type="text"
                id="slug"
                value={formData.slug}
                onChange={handleSlugChange}
                placeholder="e.g. scalloped-teak-platter"
                className={`w-full px-3.5 py-2.5 bg-[#F7F5F0] border rounded-sm text-sm text-[#29251F] focus:outline-none transition-colors ${
                  errors.slug
                    ? 'border-rose-500 bg-rose-50/30'
                    : 'border-[#E8E3D9] focus:border-[#76501F]'
                }`}
              />

              {errors.slug ? (
                <p className="text-xs text-rose-600 mt-1">
                  {errors.slug}
                </p>
              ) : (
                <p className="text-[11px] text-[#777166] mt-1">
                  Public URL: /products/{formData.slug || 'piece-slug'}
                </p>
              )}
            </div>
          </div>

          {/* Category */}
          <div>
            <label
              htmlFor="category"
              className="block text-xs font-semibold uppercase tracking-wider text-[#29251F] mb-1"
            >
              Collection Category <span className="text-rose-600">*</span>
            </label>

            <select
              id="category"
              value={formData.categorySlug}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  categorySlug: e.target.value,
                }))
              }
              className="w-full px-3.5 py-2.5 bg-[#F7F5F0] border border-[#E8E3D9] focus:border-[#76501F] rounded-sm text-sm text-[#29251F] focus:outline-none transition-colors"
            >
              <option value="">Select a category</option>

              {categories.map((category) => (
                <option key={category.id} value={category.slug}>
                  {category.name}
                </option>
              ))}
            </select>

            {errors.category && (
              <p className="text-xs text-rose-600 mt-1">
                {errors.category}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-xs font-semibold uppercase tracking-wider text-[#29251F] mb-1"
            >
              Description <span className="text-rose-600">*</span>
            </label>

            <textarea
              id="description"
              rows={3}
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              placeholder="Describe the craftsmanship, tactile character, and story of this creation..."
              className={`w-full px-3.5 py-2.5 bg-[#F7F5F0] border rounded-sm text-sm text-[#29251F] focus:outline-none transition-colors ${
                errors.description
                  ? 'border-rose-500 bg-rose-50/30'
                  : 'border-[#E8E3D9] focus:border-[#76501F]'
              }`}
            />

            {errors.description && (
              <p className="text-xs text-rose-600 mt-1">
                {errors.description}
              </p>
            )}
          </div>
        </div>

        {/* Multiple Product Images */}
        <div className="bg-white p-6 rounded-xl border border-[#E8E3D9] shadow-xs space-y-5">

          <div className="border-b border-[#E8E3D9] pb-3">
            <h2 className="font-serif text-lg text-[#281A10]">
              Product Imagery
            </h2>

            <p className="text-xs text-[#777166] mt-1">
              Add multiple product photos from different angles.
            </p>
          </div>

          {/* Image Previews */}
          {selectedImages.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">

              {selectedImages.map((image, index) => (
                <div
                  key={image.previewUrl}
                  className="relative group aspect-square rounded-xl overflow-hidden border border-[#E8E3D9] bg-[#F7F5F0]"
                >
                  <img
                    src={image.previewUrl}
                    alt={`Product preview ${index + 1}`}
                    className="w-full h-full object-cover"
                  />

                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    disabled={saving}
                    className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center rounded-full bg-[#281A10] text-white hover:bg-rose-600 transition-colors disabled:opacity-50"
                    aria-label={`Remove image ${index + 1}`}
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <span className="absolute bottom-2 left-2 text-[10px] font-semibold bg-white/90 text-[#281A10] px-2 py-1 rounded">
                    Image {index + 1}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Upload Input */}
          <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-[#D8CEBB] rounded-xl bg-[#F7F5F0]/60">

            <div className="w-12 h-12 rounded-full bg-[#76501F]/10 flex items-center justify-center mb-3">
              <ImagePlus className="w-6 h-6 text-[#76501F]" />
            </div>

            <label
              htmlFor="imageInput"
              className="cursor-pointer inline-flex items-center gap-2 px-5 py-3 bg-[#281A10] hover:bg-[#76501F] text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors"
            >
              <Upload className="w-4 h-4" />
              Select Multiple Images
            </label>

            <input
              type="file"
              id="imageInput"
              accept="image/jpeg,image/png,image/webp,image/avif"
              multiple
              onChange={handleImageChange}
              disabled={saving}
              className="hidden"
            />

            <p className="text-xs text-[#777166] mt-3">
              Select multiple photos at once or add more later.
            </p>

            <p className="text-[11px] text-[#777166] mt-1">
              JPEG, PNG, WebP, AVIF · Maximum 5 MB per image
            </p>
          </div>

          <p className="text-xs text-[#76501F]">
            {selectedImages.length} image(s) selected
          </p>
        </div>

        {/* Visibility & Badges */}
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
                  setFormData((prev) => ({
                    ...prev,
                    available: e.target.checked,
                  }))
                }
                className="w-4 h-4 text-[#76501F] rounded-xs"
              />

              <div>
                <span className="text-xs font-semibold text-[#29251F] block">
                  Available to Commission
                </span>
                <span className="text-[10px] text-[#777166]">
                  Visible in active studio catalogue
                </span>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 bg-[#F7F5F0] rounded-lg border border-[#E8E3D9] cursor-pointer">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    featured: e.target.checked,
                  }))
                }
                className="w-4 h-4 text-[#76501F] rounded-xs"
              />

              <div>
                <span className="text-xs font-semibold text-[#29251F] block">
                  Portfolio Highlight
                </span>
                <span className="text-[10px] text-[#777166]">
                  Display in featured sections
                </span>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 bg-[#F7F5F0] rounded-lg border border-[#E8E3D9] cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isNewArrival}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    isNewArrival: e.target.checked,
                  }))
                }
                className="w-4 h-4 text-[#76501F] rounded-xs"
              />

              <div>
                <span className="text-xs font-semibold text-[#29251F] block">
                  New Turning
                </span>
                <span className="text-[10px] text-[#777166]">
                  Display with 'New' banner
                </span>
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
                <span>Uploading Images & Saving...</span>
              </>
            ) : (
              <span>Save Product to Portfolio</span>
            )}
          </button>

        </div>
      </form>
    </div>
  );
}
