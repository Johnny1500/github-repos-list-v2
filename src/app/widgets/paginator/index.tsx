import useStore from "../../../shared/model/store";
import { handlePaginationClick } from "./model/utils";
import "./ui/index.css";

export default function Paginator(): JSX.Element {
  const [btnCount, currentPage, setCurrentPage] = useStore((state) => [
    state.btnCount,
    state.currentPage,
    state.setCurrentPage,
  ]);

  return (
    <section
      className="paginator__container"
      onClick={(e) => handlePaginationClick(e, setCurrentPage)}
    >
      {Array.from({ length: btnCount }).map((_, index) => {
        return (
          <button
            key={index}
            value={index}
            style={{
              backgroundColor: index === currentPage ? "white" : "black",
              color: index === currentPage ? "black" : "white",
            }}
          >
            {index + 1}
          </button>
        );
      })}
    </section>
  );
}
