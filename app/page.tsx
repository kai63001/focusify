"use client";
import IndexNavbar from "./index/components/Navbar";
import IndexHeader from "./index/components/Header";
import IndexBanner from "./index/components/Banner";
import IndexFeature from "./index/components/Feature";
import IndexFooter from "./index/components/Footer";
import IndexSubscribe from "./index/components/Subscribe";
import IndexSocial from "./index/components/Social";

export default function Home() {
  return (
    <main className="bg-[#121316]">
      <IndexNavbar />
      <IndexHeader />
      {/* banner show tools */}
      <IndexBanner />
      <IndexFeature />
      <IndexSubscribe />
      <IndexSocial />
      <IndexFooter />
    </main>
  );
}
