UPDATE public.projects 
SET galeria_de_imagens = ARRAY[
  'https://cyyrgcdtbbugvfljjouo.supabase.co/storage/v1/object/public/media/projects%2Fpontuo-mockup-2.png',
  'https://cyyrgcdtbbugvfljjouo.supabase.co/storage/v1/object/public/media/projects%2Fpontuo-mockup-4.png'
],
updated_at = now()
WHERE slug = 'app-mobilidade-pontuo';