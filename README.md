# Vishal CSC Centre – website (static, Vercel ready)

## Files
- index.html – pura page (SEO tags, JSON-LD, pre-rendered services)
- styles.css – compiled Tailwind CSS (CDN ki zaroorat nahi)
- app.js – page ka JavaScript + Firebase admin panel
- vercel.json – security headers (CSP, HSTS, X-Frame-Options, etc.)
- firestore.rules – Firebase database ke security rules
- robots.txt, sitemap.xml, site.webmanifest, favicon.svg, og-image.png, apple-touch-icon.png, 404.html

## Live karne ke 5 kaam
1. **Domain badlo:** index.html, sitemap.xml, robots.txt mein `https://YOUR-DOMAIN.com` ko apne asli domain
   (jaise https://vishalcsc.in ya Vercel wala link) se Find & Replace karo.
2. **Firebase Authentication:** Console > Authentication > Sign-in method > Email/Password chalu karo.
   Users tab mein ek admin user banao (email + strong password). Settings > "User actions" mein sign-up band kar do.
3. **Firestore:** Console > Firestore Database banao. Rules tab mein `firestore.rules` ka poora text paste karo
   aur `YOUR_ADMIN_EMAIL` ki jagah apna admin email likho. Phir Publish dabao. (Yeh step zaroori hai.)
4. **Authorized domains:** Authentication > Settings > Authorized domains mein apna Vercel/asli domain jodo.
5. **Vercel:** is folder ko GitHub par daalo, Vercel mein Import karo (Framework: Other, build command khali). Deploy.

## Admin panel
Website ke sabse neeche "Admin" link > login > Rates / Breaking news / Updates (photos).
Photo apne aap chhoti ho kar save hoti hai (Firebase Storage nahi chahiye).

## Security notes
- Firebase ki apiKey public hoti hai; asli suraksha Firestore rules aur Auth se hoti hai.
- Admin password kisi ko mat do. 20 minute idle par admin apne aap logout ho jata hai.
- Firebase Console > App Check chalu karna aur Auth mein email enumeration protection rakhna behtar hai.
