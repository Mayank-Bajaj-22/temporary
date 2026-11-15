-- ====================================================================
-- BUDDHAHOME INITIAL DATABASE SEED DATA
-- ====================================================================
-- Run this in your Supabase SQL Editor after running schema.sql
-- ====================================================================

-- 1. SEED CATEGORIES
INSERT INTO public.categories (id, name, slug, description, image_path, sort_order)
VALUES
  (
    '00000000-0000-0000-0000-000000000001',
    'Scalloped Serveware',
    'scalloped-serveware',
    'Hand-carved organic scalloped timber rims paired with delicate floral glaze ceramic and walnut finishes.',
    '/images/buddhahome/walnut-scalloped-serving-collection.png',
    1
  ),
  (
    '00000000-0000-0000-0000-000000000002',
    'Live Edge & Cutting Boards',
    'live-edge-boards',
    'Single-slab artisanal paddle boards and speckled hardwood boards celebrating natural wood grain.',
    '/images/buddhahome/wooden-paddle-boards-marble.png',
    2
  ),
  (
    '00000000-0000-0000-0000-000000000003',
    'Standing Bowls & Pedestals',
    'standing-bowls',
    'Multi-tiered turned wood pedestals, walnut bowl stands, and sculptural tabletop centerpieces.',
    '/images/buddhahome/two-tier-walnut-bowl-stand.png',
    3
  ),
  (
    '00000000-0000-0000-0000-000000000004',
    'Stone & Travertine Living',
    'stone-travertine',
    'Natural honed beige travertine trays, botanical-engraved stone coasters, and carved stone paddles.',
    '/images/buddhahome/beige-stone-tray-coral.png',
    4
  ),
  (
    '00000000-0000-0000-0000-000000000005',
    'Jungle & Animal Woodcraft',
    'jungle-woodcraft',
    'Whimsical Scandinavian-inspired animal boards, bear silhouettes, and carved wooden trivets.',
    '/images/buddhahome/bear-shaped-wooden-board.png',
    5
  ),
  (
    '00000000-0000-0000-0000-000000000006',
    'Enamel & Resin Art',
    'enamel-resin-art',
    'Artisanal food-safe resin-inlaid serving boards, deep navy accents, and speckled ceramic canisters.',
    '/images/buddhahome/blue-white-artisan-board.png',
    6
  )
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  image_path = EXCLUDED.image_path,
  sort_order = EXCLUDED.sort_order;

-- 2. SEED PRODUCTS
INSERT INTO public.products (name, slug, category_id, category_name, category_slug, description, details, images, featured, is_new_arrival, available)
VALUES
  (
    'Walnut Scalloped Serving Collection',
    'walnut-scalloped-collection',
    '00000000-0000-0000-0000-000000000001',
    'Scalloped Serveware',
    'scalloped-serveware',
    'An elegant ensemble of hand-carved scalloped walnut trays and shallow bowls featuring smooth organic petal contours and tactile satin finishes.',
    '{"woodType": "Kiln-Dried American Walnut", "dimensions": "40 cm (L) x 28 cm (W) x 4.5 cm (H)", "finish": "Hand-rubbed organic food-grade beeswax", "weight": "1.4 kg", "craftNote": "Each scalloped ridge is individually chiseled and polished by master woodturners."}'::JSONB,
    ARRAY['/images/buddhahome/walnut-scalloped-serving-collection.png', '/images/buddhahome/floral-scalloped-plate.png'],
    true,
    false,
    true
  ),
  (
    'Artisanal Wooden Paddle Boards',
    'wooden-paddle-boards-marble',
    '00000000-0000-0000-0000-000000000002',
    'Live Edge & Cutting Boards',
    'live-edge-boards',
    'Solid live-edge timber paddle boards with ergonomic comfort handles and integrated leather hanging loops. Ideal for artisanal charcuterie and cheese spreads.',
    '{"woodType": "Dense Wild Acacia & Teak", "dimensions": "48 cm (L including handle) x 22 cm (W) x 2.2 cm (Thickness)", "finish": "Cold-pressed mineral oil seal", "weight": "1.2 kg", "craftNote": "Finished with natural bark-edge preservation on one facet."}'::JSONB,
    ARRAY['/images/buddhahome/wooden-paddle-boards-marble.png', '/images/buddhahome/speckled-wood-serving-board.png'],
    true,
    true,
    true
  ),
  (
    'Two-Tier Walnut Pedestal Bowl Stand',
    'two-tier-walnut-bowl-stand',
    '00000000-0000-0000-0000-000000000003',
    'Standing Bowls & Pedestals',
    'standing-bowls',
    'Sculptural two-tiered standing bowl turned on a foot-lathe from a single piece of dark walnut. Perfect as a dramatic fruit centerpiece or tabletop riser.',
    '{"woodType": "Solid Aged Walnut", "dimensions": "32 cm (Base) x 36 cm (H)", "finish": "Satin botanical oil seal", "weight": "2.8 kg", "craftNote": "Turned with stepped pedestal risers providing exceptional balance and weight."}'::JSONB,
    ARRAY['/images/buddhahome/two-tier-walnut-bowl-stand.png', '/images/buddhahome/dark-wood-flower-tiered-stand.png'],
    true,
    false,
    true
  ),
  (
    'Beige Travertine Tray with Coral Motifs',
    'beige-stone-tray-coral',
    '00000000-0000-0000-0000-000000000004',
    'Stone & Travertine Living',
    'stone-travertine',
    'Honed raw beige travertine stone tray featuring hand-engraved terracotta botanical motifs and smooth rounded perimeter curves.',
    '{"woodType": "Natural Honed Travertine & Ceramic Inlay", "dimensions": "35 cm (L) x 20 cm (W) x 2.5 cm (H)", "finish": "Matte stone impregnator seal", "weight": "3.1 kg", "craftNote": "Preserves natural subterranean travertine pocket textures."}'::JSONB,
    ARRAY['/images/buddhahome/beige-stone-tray-coral.png', '/images/buddhahome/carved-stone-paddle-board.png'],
    true,
    true,
    true
  ),
  (
    'Forest Bear Silhouette Serving Board',
    'bear-shaped-wooden-board',
    '00000000-0000-0000-0000-000000000005',
    'Jungle & Animal Woodcraft',
    'jungle-woodcraft',
    'Delightful hand-carved solid mango wood board showcasing the gentle silhouette of a resting brown bear. Double-serves as a kitchen cutting board and wall art.',
    '{"woodType": "Wild Mango Wood", "dimensions": "38 cm (W) x 26 cm (H) x 2 cm (D)", "finish": "Natural walnut wax buff", "weight": "0.95 kg", "craftNote": "Smooth beveled edges with a discreet hanging aperture."}'::JSONB,
    ARRAY['/images/buddhahome/bear-shaped-wooden-board.png', '/images/buddhahome/whimsical-animal-board-collection.png'],
    true,
    false,
    true
  ),
  (
    'Blue & White Floral Ceramic Board',
    'blue-white-artisan-board',
    '00000000-0000-0000-0000-000000000006',
    'Enamel & Resin Art',
    'enamel-resin-art',
    'Handcrafted natural timber serving board inlaid with vibrant blue-and-white botanical glazed ceramic tiles, framed by warm teak borders.',
    '{"woodType": "Seasoned Teak & Glazed Ceramic", "dimensions": "44 cm (L) x 24 cm (W) x 2.8 cm (H)", "finish": "Water-resistant food-safe oil", "weight": "1.6 kg", "craftNote": "Joined with precision flush-mount inlay that prevents moisture traps."}'::JSONB,
    ARRAY['/images/buddhahome/blue-white-artisan-board.png', '/images/buddhahome/navy-resin-wooden-serveware.png'],
    true,
    true,
    true
  ),
  (
    'Rustic Wood Stand & Tray Duo',
    'rustic-wooden-stand-tray',
    '00000000-0000-0000-0000-000000000003',
    'Standing Bowls & Pedestals',
    'standing-bowls',
    'A versatile pair featuring an elevated wooden display stand and a nesting live-edge shallow platter, bringing height and dimension to table settings.',
    '{"woodType": "Sheesham & Acacia", "dimensions": "Stand: 30 cm dia x 14 cm H, Tray: 34 cm dia", "finish": "Organic walnut oil finish", "weight": "2.1 kg", "craftNote": "Can be arranged stacked or side-by-side as independent serving platters."}'::JSONB,
    ARRAY['/images/buddhahome/rustic-wooden-stand-tray.png', '/images/buddhahome/polished-wooden-display-stands.png'],
    false,
    true,
    true
  ),
  (
    'Speckled Hardwood Board Set',
    'speckled-wood-serving-board',
    '00000000-0000-0000-0000-000000000002',
    'Live Edge & Cutting Boards',
    'live-edge-boards',
    'Pair of rectangular and paddle-style cutting boards made from end-grain speckled hardwoods that are naturally gentle on knife edges.',
    '{"woodType": "Maple & Dark Walnut end-grain", "dimensions": "Small: 30x18 cm, Large: 42x26 cm", "finish": "Triple-coated mineral oil & beeswax balm", "weight": "1.9 kg", "craftNote": "Reversible surfaces with juice grooves on one side."}'::JSONB,
    ARRAY['/images/buddhahome/speckled-wood-serving-board.png', '/images/buddhahome/speckled-ceramic-wood-duo.png'],
    false,
    false,
    true
  ),
  (
    'Concentric Travertine Display Pedestal',
    'concentric-travertine-stand',
    '00000000-0000-0000-0000-000000000004',
    'Stone & Travertine Living',
    'stone-travertine',
    'Tiered architectural display piece carved from Italian beige travertine, featuring concentric circular stepped levels for jewelry, perfume, or botanical dried pods.',
    '{"woodType": "Raw Beige Travertine Stone", "dimensions": "26 cm (Diameter) x 12 cm (H)", "finish": "Natural porous honed finish", "weight": "3.8 kg", "craftNote": "Subtle cork base padding prevents scratching delicate surfaces."}'::JSONB,
    ARRAY['/images/buddhahome/concentric-travertine-stand.png', '/images/buddhahome/botanical-stone-coaster.png'],
    false,
    true,
    true
  ),
  (
    'Whimsical Feline Cutting Board',
    'cat-shaped-wooden-board',
    '00000000-0000-0000-0000-000000000005',
    'Jungle & Animal Woodcraft',
    'jungle-woodcraft',
    'Charming feline contour cutting and cheese platter, handcrafted with rounded ear handles and a smooth burnished tail ledge.',
    '{"woodType": "Solid Teak Timber", "dimensions": "34 cm (L) x 22 cm (W) x 2 cm (Thickness)", "finish": "Cold-pressed coconut & beeswax seal", "weight": "0.8 kg", "craftNote": "Hand-sanded to a silky touch finish that highlights warm golden teak grain."}'::JSONB,
    ARRAY['/images/buddhahome/cat-shaped-wooden-board.png', '/images/buddhahome/scandinavian-animal-collection.png'],
    false,
    false,
    true
  ),
  (
    'Deep Navy Resin & Wood Platter',
    'navy-resin-wooden-serveware',
    '00000000-0000-0000-0000-000000000006',
    'Enamel & Resin Art',
    'enamel-resin-art',
    'Dramatic live-edge timber board with an organic deep midnight navy resin river stream flowing across natural bark edges.',
    '{"woodType": "Indian Rosewood (Sheesham) & Food-Grade Epoxy", "dimensions": "45 cm (L) x 26 cm (W) x 3 cm (H)", "finish": "Micro-buffed crystal satin luster", "weight": "2.3 kg", "craftNote": "Each resin flow is poured individually, making every pattern unique like river waters."}'::JSONB,
    ARRAY['/images/buddhahome/navy-resin-wooden-serveware.png', '/images/buddhahome/artisan-wood-resin-boards.png'],
    true,
    false,
    true
  ),
  (
    'Floral Rimmed Scalloped Plate',
    'floral-scalloped-plate',
    '00000000-0000-0000-0000-000000000001',
    'Scalloped Serveware',
    'scalloped-serveware',
    'Hand-turned wooden serving charger featuring scalloped outer perimeter petal carvings and a glazed botanical ceramic centerpiece.',
    '{"woodType": "Aged Mango Wood & Artisan Glaze", "dimensions": "28 cm (Diameter) x 3.5 cm (H)", "finish": "Satin natural oil", "weight": "1.1 kg", "craftNote": "Designed as an artisanal charger plate or bread and pastry presentation server."}'::JSONB,
    ARRAY['/images/buddhahome/floral-scalloped-plate.png', '/images/buddhahome/walnut-scalloped-serving-collection.png'],
    false,
    true,
    true
  )
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  category_id = EXCLUDED.category_id,
  category_name = EXCLUDED.category_name,
  category_slug = EXCLUDED.category_slug,
  description = EXCLUDED.description,
  details = EXCLUDED.details,
  images = EXCLUDED.images,
  featured = EXCLUDED.featured,
  is_new_arrival = EXCLUDED.is_new_arrival,
  available = EXCLUDED.available;
