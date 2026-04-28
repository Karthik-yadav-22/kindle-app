# PageTurner - Deployment Guide

## Project Overview
PageTurner is a Kindle-style book reading web application with user authentication, book uploads, admin panel, and PDF reading capabilities.

## Quick Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   # Create a new GitHub repository and push
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com) and sign in
   - Click "Add New..." → "Project"
   - Import your GitHub repository
   - Add the following Environment Variables in Vercel project settings:

   | Variable | Description |
   |----------|-------------|
   | `SUPABASE_URL` | Your Supabase project URL (e.g., `https://xxxxx.supabase.co`) |
   | `SUPABASE_ANON_KEY` | Your Supabase anon key (Project Settings → API) |
   | `ADMIN_EMAIL` | Admin email for notifications |
   | `EMAILJS_SERVICE_ID` | EmailJS service ID (optional, for email notifications) |
   | `EMAILJS_TEMPLATE_ID` | EmailJS template ID (optional) |
   | `EMAILJS_PUBLIC_KEY` | EmailJS public key (optional) |

3. **Deploy** - Click "Deploy" and wait for the build to complete.

## Supabase Setup

1. **Create a Supabase Project**
   - Go to [supabase.com](https://supabase.com) and create a new project
   - Note your `SUPABASE_URL` and `SUPABASE_ANON_KEY`

2. **Run the Schema**
   - Go to Supabase Dashboard → SQL Editor
   - Copy and paste the contents of `supabase_schema.sql`
   - Click "Run" to execute

3. **Create Storage Buckets**
   - Go to Storage → New Bucket
   - Create `books-pdf` (private bucket for PDF files)
   - Create `book-covers` (public bucket for cover images)

4. **Storage Policies** (run in SQL Editor):
   ```sql
   -- PDFs: authenticated users can upload and read
   CREATE POLICY "Authenticated users can upload PDFs" 
   ON storage.objects FOR INSERT 
   WITH CHECK (bucket_id = 'books-pdf' AND auth.role() = 'authenticated');
   
   CREATE POLICY "Authenticated users can read PDFs" 
   ON storage.objects FOR SELECT 
   USING (bucket_id = 'books-pdf' AND auth.role() = 'authenticated');
   
   -- Covers: anyone can view, authenticated users can upload
   CREATE POLICY "Anyone can view covers" 
   ON storage.objects FOR SELECT 
   USING (bucket_id = 'book-covers');
   
   CREATE POLICY "Authenticated users can upload covers" 
   ON storage.objects FOR INSERT 
   WITH CHECK (bucket_id = 'book-covers' AND auth.role() = 'authenticated');
   ```

5. **Create an Admin User**
   - Sign up through the app with your admin email
   - Run this SQL to make them admin:
   ```sql
   UPDATE public.profiles SET role = 'admin' WHERE email = 'your-admin-email@example.com';
   ```

## EmailJS Setup (Optional)

For admin email notifications when users submit book requests:

1. Go to [emailjs.com](https://emailjs.com) and create an account
2. Create an Email Service (e.g., Gmail)
3. Create an Email Template for book request notifications
4. Add the service ID, template ID, and public key to Vercel environment variables

## Project Structure

```
kindle-app/
├── index.html              # Login/Signup page
├── vercel.json             # Vercel routing config
├── supabase_schema.sql     # Database schema
├── css/
│   └── main.css           # All styles
├── js/
│   ├── config.js          # Supabase & config
│   ├── auth.js            # Auth utilities
│   └── ui.js              # UI helpers
├── pages/
│   ├── dashboard.html     # User dashboard
│   └── admin.html         # Admin panel
└── upload/
    ├── admin.html         # Legacy admin (unused)
    └── reader.html        # PDF reader
```

## Features

- **User Authentication**: Sign up, sign in, password reset via Supabase Auth
- **Book Library**: Browse, search, and filter books by genre
- **Wishlist**: Save books to your wishlist
- **Book Upload**: Submit books for admin review
- **PDF Reader**: Read books with notes, bookmarks, and progress tracking
- **Admin Panel**: Approve/reject book requests, manage users, upload books directly
- **Themes**: Light, Dark, and Vintage themes

## Troubleshooting

### Books not loading
- Check Supabase RLS policies are set correctly
- Verify storage buckets exist and have proper policies

### Upload fails
- Check storage bucket policies
- Ensure PDF file is under 10MB (Supabase free tier limit)

### Auth issues
- Verify `SUPABASE_URL` and `SUPABASE_ANON_KEY` are correct
- Check redirect URLs in Supabase Authentication settings

### 404 on refresh
- Vercel rewrites handle this automatically via `vercel.json`