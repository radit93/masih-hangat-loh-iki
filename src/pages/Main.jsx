import '../App.css';
import Header from "../components/Layout/Header/Header";
import Footer from "../components/Layout/Footer/Footer"; 
import { dummyProducts } from "../data/DataProduct";
import ProductCarousel from "../components/Product/ProductCarousel";
import SectionTitle from '../components/Product/SectionTitle';
import Container from "../components/Layout/Container/Container";


function Main() {

  return (
     <div className="bg-[#FAF7F0] min-h-screen w-full overflow-x-hidden flex flex-col">
      <Header />

      <main className="flex-1 flex flex-col items-center justify-center text-gray-800">

        <Container>  {/* ← sekarang semua konten ada dalam Container */}

          <h2 className="text-xl font-bold mb-4 text-center">Produk</h2>

          <SectionTitle title="Nike" link="/category/nike" />
          <ProductCarousel />

          <SectionTitle title="Adidas" link="/category/adidas" />
          <ProductCarousel />

        </Container>

      </main>

      <Footer />
    </div>
  )
}

export default Main
