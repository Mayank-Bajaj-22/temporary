/**
 * Site Configuration for BuddhaHome
 * Centralized business details and contact parameters.
 */
export const siteConfig = {
  brandName: "BuddhaHome",
  tagline: "Rooted in Nature & Artisanal Living",
  subTagline: "Handcrafted wooden tableware, sculptural pedestals, and natural stone decor made for mindful living.",
  currency: "INR",
  currencySymbol: "₹",
  
  // Contact details
  contactPhone: "+91 98765 43210",
  whatsappNumber: "+919876543210", // WhatsApp enquiry destination
  contactEmail: "hello@buddhahome.in",
  workshopAddress: "BuddhaHome Woodcraft Studio & Design Workshop, Bengaluru, India",
  
  // Social links (placeholders)
  social: {
    instagram: "https://instagram.com/buddhahome",
    pinterest: "https://pinterest.com/buddhahome",
    facebook: "https://facebook.com/buddhahome"
  },
  
  // Announcement banner text
  announcement: "BuddhaHome Artisanal Wood & Stone Collections. Direct Workshop Commissions Available."
};

/**
 * Generate a WhatsApp enquiry URL with encoded prefilled message
 * @param {string} productName 
 * @param {string} productUrl 
 * @returns {string} WhatsApp URL
 */
export const getWhatsAppEnquiryUrl = (productName, productUrl = "") => {
  if (!siteConfig.whatsappNumber) return "/contact";
  
  const cleanNumber = siteConfig.whatsappNumber.replace(/[^0-9]/g, "");
  const fullUrl = productUrl || (typeof window !== "undefined" ? window.location.href : "");
  const message = `Hi BuddhaHome team, I am interested in "${productName}" (${fullUrl}). Could you please share the handcrafted quote, available wood finishes, and delivery timeline?`;
  
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
};
