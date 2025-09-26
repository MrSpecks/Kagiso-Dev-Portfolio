# 🌐 Developer Portfolio

A modern, responsive developer portfolio built with **React**, **Tailwind CSS**, **Supabase**, and **React Query**. Designed to be recruiter-friendly, clean, and easily extensible.

This portfolio highlights certifications, projects, and professional experience while offering a sleek dark/light theme toggle, interactive skill displays, and integrated backend data from Supabase.

---

## 🚀 Tech Stack

* **Frontend:** React + React Router
* **Styling:** Tailwind CSS + custom gradients
* **Backend:** Supabase (PostgreSQL + Auth + Storage)
* **Data Fetching:** React Query (`@tanstack/react-query`)
* **Icons:** Lucide React
* **Deployment:** Vercel

---

## 📄 Pages

### 🏠 Home Page

* **Hero Section** with name, tagline, CTA, and floating **skills cloud**.
* **Stats Section** with cards for:

  * Projects Completed (static count for now).
  * Certifications Earned (dynamic count from Supabase).
  * Years of Experience.
* **Technical Skills Section** using animated badges for your stack.
* **Call-to-Action Section** inviting collaboration and linking to Contact page.

### 👤 About Page

* **Personal Story** with narrative on career journey.
* **Experience Timeline** showcasing roles, companies, dates, and descriptions.
* **Education Section** with institutions, programs, and details.
* **Interests & Hobbies** as interactive badges.
* Clean card-based layout for readability and recruiter-friendliness.

---

## 🛠️ Supabase Integration

This project uses Supabase for certifications and projects data.

**Certifications Fetch Example:**

```js
const { data, error } = await supabase
  .from("certifications")
  .select("*");
```

* Each certification includes:

  * `title`, `provider`, `date`, `description`, `file_url`.
* Displayed dynamically as responsive cards with hover states.

**Certifications Count on Home:**

```js
const { data: certifications } = useQuery({
  queryKey: ["certifications-count"],
  queryFn: async () => {
    const { data, error } = await supabase
      .from("certifications")
      .select("id", { count: "exact" });
    if (error) throw error;
    return data;
  },
});
```

---

## 🎨 Styling Guidelines

* **Dark Mode:** Grey-to-dark gradient background.
* **Light Mode:** Clean off-white background.
* **Cards:** Rounded, with hover shadows and smooth transitions.
* **Consistency:** Tailwind’s grid/flex layouts ensure clean spacing.

---

## 📦 Installation & Setup

```bash
# Clone the repo
git clone https://github.com/yourusername/portfolio.git
cd portfolio

# Install dependencies
npm install

# Add environment variables
cp .env.example .env
# Fill in your Supabase URL + Anon Key

# Start development server
npm run dev
```

---

## 🌍 Deployment

1. Push to GitHub.
2. Connect repo to [Vercel](https://vercel.com/).
3. Add environment variables in Vercel dashboard:

   * `NEXT_PUBLIC_SUPABASE_URL`
   * `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy — and you’re live!

---

## 📌 Roadmap

*

---

## 📜 License

MIT License. Feel free to fork, modify, and build on top of this portfolio.

---

## 📸 Screenshots

*(Optional: Add screenshots here to give recruiters a quick visual of your site)*
