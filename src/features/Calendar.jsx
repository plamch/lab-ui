import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

export const Calendar = () => (
    <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={[
            { title: 'important event', date: '2022-01-09' },
            { title: 'another event', date: '2022-01-10' },
        ]}
    />
)
