document.addEventListener('DOMContentLoaded', function () {
    const createEventButton = document.getElementById('createEventButton');
    const showHomeButton = document.getElementById('showHomeButton');
    const eventCreationForm = document.getElementById('eventCreationForm');
    const homeSection = document.getElementById('homeSection');
    const eventList = document.getElementById('eventList');
    const eventCount = document.getElementById('eventCount');

    createEventButton.addEventListener('click', function () {
        eventCreationForm.classList.toggle('hidden');
        homeSection.classList.add('hidden');
    });

    showHomeButton.addEventListener('click', function () {
        eventCreationForm.classList.add('hidden');
        homeSection.classList.remove('hidden');
        displayEvents();
    });

    const events = [];

    function addEventToHome(event) {
        const eventItem = document.createElement('div');
        eventItem.classList.add('event-card');
        eventItem.innerHTML = `
            <h3>${event.title}</h3>
            <p>${event.description}</p>
            <p>Date: ${event.date}</p>
            <p>Time: ${event.time}</p>
            <p>Attendees: <span id="eventAttendees_${event.id}">${event.attendees}</span></p>
            <button class="registration-button" data-event-id="${event.id}">Register</button>
        `;
        eventList.appendChild(eventItem);

        const registerButton = eventItem.querySelector(`[data-event-id="${event.id}"]`);
        registerButton.addEventListener('click', function () {
            registerForEvent(event);
        });
    }

    function displayEvents() {
        eventList.innerHTML = '';
        eventCount.textContent = `Total Events: ${events.length}`;
        for (const event of events) {
            addEventToHome(event);
        }
    }

    let eventIdCounter = 0;

    function registerForEvent(event) {
        // Simulate event registration (you would have a real registration process)
        event.attendees++;
        const attendeesElement = document.getElementById(`eventAttendees_${event.id}`);
        attendeesElement.textContent = event.attendees;
    }

    const publishEventButton = document.getElementById('publishEventButton');
    publishEventButton.addEventListener('click', function () {
        const eventTitle = document.getElementById('eventTitle').value;
        const eventDescription = document.getElementById('eventDescription').value;
        const eventDate = document.getElementById('eventDate').value;
        const eventTime = document.getElementById('eventTime').value;

        const newEvent = {
            id: eventIdCounter++,
            title: eventTitle,
            description: eventDescription,
            date: eventDate,
            time: eventTime,
            attendees: 0,
        };

        events.push(newEvent);

        document.getElementById('eventTitle').value = '';
        document.getElementById('eventDescription').value = '';
        document.getElementById('eventDate').value = '';
        document.getElementById('eventTime').value = '';

        displayEvents();
    });
});
