import { useEffect, useMemo, useState } from "react";
import { useOutletContext } from "react-router";
import { Button, EventCard, LiveTag } from "../../../components";
import PageLayout from "../../../layout/PageLayout";
import { ArrowRight, Search } from "lucide-react";
import { events } from "../../../TestData.js";

const PAGE_WINDOW_SIZE = 5;

function LiveEvents() {
  const setActivePage = useOutletContext();

  // Pagination and filtering state are kept separate so the full filtered
  // collection remains available while only the active page is rendered.
  const [currentPage, setCurrentPage] = useState(1);
  const [eventsPerPage, setEventsPerPage] = useState(6);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Replace this local fixture with the event-stream data source when the API
  const eventData = events; //change it when data comes form backend

  const filterData = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return eventData.filter((event) => {
      const matchesSeverity = filter === "all" || event.threatLevel === filter;
      const matchesSearch =
        !query ||
        [
          event.id,
          event.description,
          event.desc,
          event.asset,
          event.ip,
          event.location,
          event.user,
          event.role,
          event.threatLevel,
        ].some((value) =>
          String(value ?? "")
            .toLowerCase()
            .includes(query),
        );

      return matchesSeverity && matchesSearch;
    });
  }, [eventData, filter, searchQuery]);

  // Derive the visible page from the complete filtered collection.
  const totalPages = Math.ceil(filterData.length / eventsPerPage);
  const firstEventIndex = (currentPage - 1) * eventsPerPage;
  const currentEvents = filterData.slice(
    firstEventIndex,
    firstEventIndex + eventsPerPage,
  );
  const firstVisiblePage = Math.max(
    1,
    Math.min(
      currentPage - Math.floor(PAGE_WINDOW_SIZE / 2),
      totalPages - PAGE_WINDOW_SIZE + 1,
    ),
  );
  const visiblePages = Array.from(
    {
      length: Math.min(PAGE_WINDOW_SIZE, totalPages),
    },
    (_, index) => firstVisiblePage + index,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [filter, searchQuery]);

  useEffect(() => {
    setActivePage(1);
  }, [setActivePage]);

  // Adjust the page size for the responsive card layout and reset pagination
  // because a viewport change can invalidate the current page.
  useEffect(() => {
    const updateEventsPerPage = () => {
      setEventsPerPage(
        window.innerWidth <= 767
          ? eventData.length
          : window.innerWidth <= 1278
            ? 6
            : 16,
      );
      setCurrentPage(1);
    };

    updateEventsPerPage();
    window.addEventListener("resize", updateEventsPerPage);

    return () => {
      window.removeEventListener("resize", updateEventsPerPage);
    };
  }, []);
  return (
    <PageLayout
      heading="Live Events Stream"
      desc="Millisecond events indexing ingestion tracking endpoints, networks, DNS payloads, and cloud operations."
      live={true}
    >
      {/* Mobile-only live status indicator. */}
      <div className="block xl:hidden">
        <LiveTag />
      </div>

      {/* Search and stream controls. */}
      <div className="w-full p-3 bg-(--bg-sec) rounded-md border border-(--border) flex flex-col xl:flex-row xl:items-center gap-3">
        {/* search */}
        <div className="w-full p-2 bg-(--bg) border border-(--border) flex items-center justify-start gap-2 rounded-md ">
          <Search size={20} className="text-(--text-sec)" />
          <input
            type="text"
            id="live-search"
            name="live-search"
            placeholder="Filter event type, IP, host..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            className="outline-0 focus:outline-0 leading-0 text-md text-(--text) placeholder:text-(--text-sec) w-full "
          />
        </div>

        {/* filter and buttons */}
        <div className="w-full flex justify-start xl:justify-between gap-2 text-center flex-wrap ">
          {/* filter */}
          <div className="p-2 bg-(--bg) border border-(--border) rounded-md">
            <label htmlFor="filter" className="text-md font-semibold mr-2">
              Security :
            </label>

            <select
              name="filter"
              id="filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="text-md font-semibold focus:outline-0 leading-none"
            >
              <option
                className="bg-(--bg) text-center text-(--text-sec) p-2 border border-(--border) "
                value="all"
              >
                All
              </option>
              <option
                className=" bg-(--bg) text-center text-(--text-sec) p-2 border text-md border-(--border) "
                value="critical"
              >
                Critical
              </option>
              <option
                className="bg-(--bg) text-center text-(--text-sec) p-2 border border-(--border) "
                value="high"
              >
                High
              </option>
              <option
                className="bg-(--bg) text-center text-(--text-sec) p-2 border border-(--border) "
                value="medium"
              >
                Medium
              </option>
              <option
                className="bg-(--bg) text-center text-(--text-sec) p-2 border border-(--border) "
                value="low"
              >
                Low
              </option>
            </select>
          </div>

          <div className="flex gap-2">
            <div className="w-30 min-w-0! xl:self-end">
              <Button
                className="border! text-md!  min-w-0!"
                label="Pause Stream"
              />
            </div>

            <div className="w-30 xl:self-end">
              <Button
                className=" border! text-md!  min-w-0!"
                label="CSV Export"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Compact pagination controls for the filtered event collection. */}
      <div className="hidden  md:flex w-full flex-wrap items-center justify-end gap-2">
        {/* previous button */}
        <button
          type="button"
          onClick={() => setCurrentPage((page) => page - 1)}
          disabled={currentPage === 1}
          className="rounded-md border border-(--border) bg-(--bg-sec) px-3 py-2 text-sm font-semibold text-(--text) disabled:cursor-not-allowed disabled:opacity-50"
        >
          Previous
        </button>

        {/* pages button */}
        {visiblePages.map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => setCurrentPage(page)}
            className={`w-9 h-9 rounded-md border text-sm font-semibold ${
              currentPage === page
                ? "border-(--accent) bg-(--accent) text-(--bg-sec)"
                : "border-(--border) bg-(--bg-sec) text-(--text)"
            }`}
          >
            {page}
          </button>
        ))}

        {/* next button */}
        <button
          type="button"
          onClick={() => setCurrentPage((page) => page + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
          className="rounded-md border border-(--border) bg-(--bg-sec) px-3 py-2 text-sm font-semibold text-(--text) disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Render only the events belonging to the active page. */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2  xl:grid-cols-4 gap-4">
        {currentEvents.map((event) => (
          <EventCard
            key={event.id}
            varient="live"
            data={event}
            buttons={[
              {
                label: "Inspect event",
                icon: ArrowRight,
                onClickFuncion: () => console.log("button"),
                iconSize: 15,
              },
            ]}
          />
        ))}
      </div>
    </PageLayout>
  );
}

export default LiveEvents;
