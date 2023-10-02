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
            <p>Location: ${event.location}</p>
            <p>Attendees: <span id="eventAttendees_${event.id}">${event.attendees}</span></p>
            <p class="countdown" id="eventCountdown_${event.id}">Countdown: 00:00:00</p>
            <button class="registration-button" data-event-id="${event.id}">Register</button>
        `;
        eventList.appendChild(eventItem);

        const registerButton = eventItem.querySelector(`[data-event-id="${event.id}"]`);
        registerButton.addEventListener('click', function () {
            registerForEvent(event);
        });

        // Display live countdown timer
        const countdownElement = eventItem.querySelector(`#eventCountdown_${event.id}`);
        const eventTime = new Date(`${event.date}T${event.time}:00`);
        updateCountdown(countdownElement, eventTime);
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
        const eventLocation = document.getElementById('eventLocation').value;

        const newEvent = {
            id: eventIdCounter++,
            title: eventTitle,
            description: eventDescription,
            date: eventDate,
            time: eventTime,
            location: eventLocation,
            attendees: 0,
        };

        events.push(newEvent);

        document.getElementById('eventTitle').value = '';
        document.getElementById('eventDescription').value = '';
        document.getElementById('eventDate').value = '';
        document.getElementById('eventTime').value = '';
        document.getElementById('eventLocation').value = '';

        displayEvents();
    });

    function updateCountdown(countdownElement, eventTime) {
        function update() {
            const currentTime = new Date();
            const timeDiff = eventTime - currentTime;

            if (timeDiff <= 0) {
                countdownElement.textContent = 'Event Ended';
            } else {
                const hours = String(Math.floor((timeDiff / (1000 * 60 * 60)) % 24)).padStart(2, '0');
                const minutes = String(Math.floor((timeDiff / 1000 / 60) % 60)).padStart(2, '0');
                const seconds = String(Math.floor((timeDiff / 1000) % 60)).padStart(2, '0');
                countdownElement.textContent = `Countdown: ${hours}:${minutes}:${seconds}`;
            }
        }

        update();
        const countdownInterval = setInterval(update, 1000);
    }
});
