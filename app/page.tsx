"use client";
import IndexNavbar from "./index/components/Navbar";
import IndexHeader from "./index/components/Header";
import IndexBanner from "./index/components/Banner";
import IndexFeature from "./index/components/Feature";

export default function Home() {
  return (
    <main className="bg-[#121316]">
      <IndexNavbar />
      <IndexHeader />
      {/* banner show tools */}
      <IndexBanner />
      <IndexFeature />
    </main>
  );
}
