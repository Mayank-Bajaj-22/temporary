import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle, 
  Clock, 
  Sparkles, 
  Send, 
  AlertCircle 
} from 'lucide-react';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import { siteConfig } from '../config/site';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    interestedIn: 'Custom Woodwork',
    message: '',
  });

  const [formStatus, setFormStatus] = useState(null); // 'info'

  const handleSubmit = (e) => {
    e.preventDefault();
    // As per instruction: Clearly indicate frontend prototype without fake delivery claims
    setFormStatus('notice');
  };

  return (
    <div className="py-12 sm:py-20">
      <Container>
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-20">
          <span className="text-xs font-semibold tracking-[0.25em] text-[#76501F] uppercase">
            Direct Workshop Dialogue
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#281A10] mt-2 mb-4 tracking-tight">
            Connect with CraftedRoot
          </h1>
          <p className="text-sm sm:text-base text-[#777166] leading-relaxed font-sans">
            Whether you wish to enquire about an existing handcrafted creation, commission bespoke dimensions, or discuss wood finishes, our artisans are ready to assist.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left Column: Direct Contact Info & WhatsApp */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white border border-[#E8E3D9] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
              <h2 className="font-serif text-2xl text-[#281A10]">Direct Inquiries</h2>
              <p className="text-xs text-[#777166] leading-relaxed">
                We prefer direct, authentic conversations where we can share photos of current wood slabs and discuss your exact space requirements.
              </p>

              {/* WhatsApp Primary Card */}
              {siteConfig.whatsappNumber && (
                <div className="p-4 rounded-xl bg-[#EFEAD8] border border-[#B69A63]/50 space-y-2.5">
                  <div className="flex items-center gap-2 text-[#76501F] text-xs font-semibold uppercase tracking-wider">
                    <MessageCircle className="w-4 h-4" />
                    <span>Instant WhatsApp Consultation</span>
                  </div>
                  <p className="text-xs text-[#777166]">
                    Quick responses, workshop photos, and finish consultation directly on your phone.
                  </p>
                  <a
                    href={`https://wa.me/${siteConfig.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent("Hi CraftedRoot team, I'd like to enquire about your handcrafted wooden furniture and custom options.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-[#76501F] text-white text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-[#281A10] transition-colors mt-1"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Open WhatsApp Chat</span>
                  </a>
                </div>
              )}

              {/* Other Contact Details */}
              <div className="space-y-4 pt-2 text-sm text-[#29251F]">
                {siteConfig.contactPhone && (
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-full bg-[#F7F5F0] border border-[#E8E3D9] flex items-center justify-center text-[#76501F] shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-[11px] text-[#777166] uppercase tracking-wider">
                        Phone Enquiries
                      </span>
                      <a href={`tel:${siteConfig.contactPhone.replace(/[^0-9+]/g, '')}`} className="font-medium hover:text-[#76501F]">
                        {siteConfig.contactPhone}
                      </a>
                    </div>
                  </div>
                )}

                {siteConfig.contactEmail && (
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-full bg-[#F7F5F0] border border-[#E8E3D9] flex items-center justify-center text-[#76501F] shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-[11px] text-[#777166] uppercase tracking-wider">
                        Email
                      </span>
                      <a href={`mailto:${siteConfig.contactEmail}`} className="font-medium hover:text-[#76501F]">
                        {siteConfig.contactEmail}
                      </a>
                    </div>
                  </div>
                )}

                {siteConfig.workshopAddress && (
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-full bg-[#F7F5F0] border border-[#E8E3D9] flex items-center justify-center text-[#76501F] shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-[11px] text-[#777166] uppercase tracking-wider">
                        Workshop & Studio
                      </span>
                      <p className="font-medium leading-snug text-xs sm:text-sm">
                        {siteConfig.workshopAddress}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3.5 pt-2 border-t border-[#E8E3D9]/60">
                  <div className="w-9 h-9 rounded-full bg-[#F7F5F0] border border-[#E8E3D9] flex items-center justify-center text-[#76501F] shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[11px] text-[#777166] uppercase tracking-wider">
                      Studio Hours
                    </span>
                    <p className="font-medium text-xs sm:text-sm">
                      Monday to Saturday: 10:00 AM – 7:00 PM IST
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Inquiry Form Prototype */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-[#E8E3D9] rounded-2xl p-6 sm:p-10 shadow-xs">
              <div className="mb-6">
                <span className="text-xs font-semibold tracking-[0.2em] text-[#76501F] uppercase">
                  Written Message
                </span>
                <h3 className="text-2xl font-serif text-[#281A10] mt-1">
                  Enquiry & Commission Form
                </h3>
                <p className="text-xs text-[#777166] mt-1">
                  Fill out your requirements below. Note: For immediate assistance, please use WhatsApp or Phone directly.
                </p>
              </div>

              {formStatus === 'notice' && (
                <div className="mb-6 p-4 rounded-xl bg-[#F2EDE2] border border-[#B69A63]/50 flex items-start gap-3 text-xs text-[#281A10]">
                  <AlertCircle className="w-4 h-4 text-[#76501F] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-semibold">Demo Prototype Notice</strong>
                    This frontend inquiry form is a visual design prototype. Backend email dispatch will be configured in the next phase. Please reach out via WhatsApp at{' '}
                    <a
                      href={`https://wa.me/${siteConfig.whatsappNumber.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-[#76501F] underline"
                    >
                      {siteConfig.whatsappNumber}
                    </a>{' '}
                    or phone for immediate assistance!
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-[#29251F] mb-1.5">
                      Your Name <span className="text-[#76501F]">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Shyam Sharma"
                      className="w-full px-3.5 py-2.5 bg-[#F7F5F0] border border-[#E8E3D9] rounded-sm text-sm text-[#29251F] focus:border-[#76501F] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-xs font-semibold uppercase tracking-wider text-[#29251F] mb-1.5">
                      Phone Number <span className="text-[#76501F]">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full px-3.5 py-2.5 bg-[#F7F5F0] border border-[#E8E3D9] rounded-sm text-sm text-[#29251F] focus:border-[#76501F] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-[#29251F] mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. shyam@example.com"
                      className="w-full px-3.5 py-2.5 bg-[#F7F5F0] border border-[#E8E3D9] rounded-sm text-sm text-[#29251F] focus:border-[#76501F] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="interestedIn" className="block text-xs font-semibold uppercase tracking-wider text-[#29251F] mb-1.5">
                      Subject / Interest
                    </label>
                    <select
                      id="interestedIn"
                      value={formData.interestedIn}
                      onChange={(e) => setFormData({ ...formData, interestedIn: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#F7F5F0] border border-[#E8E3D9] rounded-sm text-sm text-[#29251F] focus:border-[#76501F] focus:outline-none transition-colors"
                    >
                      <option value="End Tables">End Tables Enquiry</option>
                      <option value="Bookshelves">Tree Bookshelves</option>
                      <option value="Lamps">Handmade Lamps</option>
                      <option value="Custom Woodwork">Custom Furniture Commission</option>
                      <option value="General Question">General Question</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-[#29251F] mb-1.5">
                    Your Requirements & Space Dimensions <span className="text-[#76501F]">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about the piece you are looking for, preferred wood species, or any specific dimensions..."
                    className="w-full px-3.5 py-2.5 bg-[#F7F5F0] border border-[#E8E3D9] rounded-sm text-sm text-[#29251F] focus:border-[#76501F] focus:outline-none transition-colors"
                  />
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full sm:w-auto"
                    icon={Send}
                    iconPosition="right"
                  >
                    Submit Enquiry
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
