import HeroSection from '../sections/home/HeroSection'
import BrandStatementSection from '../sections/home/BrandStatementSection'
import CollectionsPreviewSection from '../sections/home/CollectionsPreviewSection'
import ShopPreviewSection from '../sections/home/ShopPreviewSection'
import BlogPreviewSection from '../sections/home/BlogPreviewSection'
import NewsletterCTASection from '../sections/home/NewsletterCTASection'

export default function Home() {
  return (
    <main>
      <HeroSection />
      <BrandStatementSection />
      <CollectionsPreviewSection />
      <ShopPreviewSection />
      <BlogPreviewSection />
      <NewsletterCTASection />
    </main>
  )
}
