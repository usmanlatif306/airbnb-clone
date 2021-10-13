import { useRouter } from "next/dist/client/router";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { format } from "date-fns";
import InfoCard from "../components/InfoCard";

function Search({ results }) {
  console.log(results);
  const router = useRouter();
  const formattedStartDate = format(
    new Date(router.query.startDate),
    "dd MMMM yy"
  );
  const formattedEndDate = format(new Date(router.query.endDate), "dd MMMM yy");
  const range = `${formattedStartDate} - ${formattedEndDate}`;
  return (
    <div className="">
      <Header
        placehoder={`${router.query.location} | ${range} | ${router.query.guest} Guests`}
      />
      <main className="flex">
        <section className="flex-grow pt-14 px-6">
          <p className="text-xs">
            300+ Stays - {range} - for {router.query.guest} Guests
          </p>
          <h1 className="text-3xl font-semibold mt-2 mb-6">
            Stays in {router.query.location}
          </h1>
          <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
            <p className="button">Cancellation Flexibility</p>
            <p className="button">Type of Place</p>
            <p className="button">Price</p>
            <p className="button">Rooms and Beds</p>
            <p className="button">More Filters</p>
          </div>
          <div className="flex flex-col">
            {results?.map((item, idx) => (
              <InfoCard key={idx} item={item} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Search;

export async function getServerSideProps() {
  const results = await fetch("https://links.papareact.com/isz").then((res) =>
    res.json()
  );

  return {
    props: {
      results: results,
    },
  };
}
