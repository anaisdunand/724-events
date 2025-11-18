import { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

const PER_PAGE = 9;

const EventList = () => {
    const { data, error } = useData();
    const [type, setType] = useState();
    const [currentPage, setCurrentPage] = useState(1);

    const changeType = (evtType) => {
        setCurrentPage(1);
        setType(evtType);
    };

    const filteredByType = data?.events.filter(event => !type || event.type === type) || [];
    const filteredEvents = filteredByType.filter((_, index) =>
        (currentPage - 1) * PER_PAGE <= index && index < PER_PAGE * currentPage
    );

    const pageNumber = Math.ceil(filteredByType.length / PER_PAGE);
    const typeList = new Set(data?.events.map((event) => event.type));

    return (
        <>
        {error && <div>An error occured</div>}
        {data === null ? (
            "loading"
        ) : (
            <>
            <h3 className="SelectTitle">Catégories</h3>
            <Select
                selection={Array.from(typeList)}
                onChange={(value) => (value ? changeType(value) : changeType(null))}
            />
            <div id="events" className="ListContainer">
                {filteredEvents.map((event) => (
                    <Modal key={event.id} Content={<ModalEvent event={event} />}>
                        {({ setIsOpened }) => (
                            <EventCard
                                src={event.cover}
                                label={event.type}
                                title={event.title}
                                date={new Date(event.date)}
                                onClick={() => setIsOpened(true)}
                            />
                        )}
                    </Modal>
                ))}
            </div>
            <div className="Pagination">
                {[...Array(pageNumber || 0)].map((_, n) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <a key={n} href="#events" onClick={() => setCurrentPage(n + 1)}>
                        {n + 1}
                    </a>
                ))}
            </div>
            </>
        )}
        </>
    );
};

export default EventList;