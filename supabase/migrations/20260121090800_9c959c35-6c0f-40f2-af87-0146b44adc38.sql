-- Add price column to product_sizes table
ALTER TABLE public.product_sizes
ADD COLUMN price numeric DEFAULT NULL;