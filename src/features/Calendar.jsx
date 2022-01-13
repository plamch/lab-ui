import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { Helmet } from 'react-helmet-async'

const handleDateClick = (arg) => alert(`The chosen date is ${arg.dateStr}`)

export const Calendar = () => (
    <>
        <Helmet>
            <title>Calendar</title>
        </Helmet>
        <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={[
                { title: 'important event', date: '2022-01-09' },
                { title: 'another event', date: '2022-01-10' },
                { title: 'lesson', start: '2022-01-13T12:30:00', end: '2022-01-13T14:30:00' },
            ]}
            dateClick={handleDateClick}
            editable="true"
            eventDurationEditable="true"
        />
    </>
)
