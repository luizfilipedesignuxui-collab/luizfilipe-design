UPDATE public.projects 
SET galeria_de_imagens = ARRAY[
  'https://cyyrgcdtbbugvfljjouo.supabase.co/storage/v1/object/public/media/projects/aura-scent-mockup-1.png',
  'https://cyyrgcdtbbugvfljjouo.supabase.co/storage/v1/object/public/media/projects/aura-scent-mockup-2.png'
]
WHERE slug = 'aura-scent-boutique';