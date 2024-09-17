// Sample data for bus availability
const busData = {
    route1: {
        '2024-09-18': ['Bus A', 'Bus B', 'Bus C'],
        '2024-09-19': ['Bus D', 'Bus E']
    },
    route2: {
        '2024-09-18': ['Bus F', 'Bus G'],
        '2024-09-19': ['Bus H', 'Bus I', 'Bus J']
    }
 };
 
 // Dropdown functionality
 const selectedRoute = document.getElementById('selectedRoute');
 const routeOptions = document.getElementById('routeOptions');
 const options = document.querySelectorAll('.option');
 
 selectedRoute.addEventListener('click', function() {
    routeOptions.parentElement.classList.toggle('active'); // Toggle dropdown visibility
 });
 
 options.forEach(option => {
    option.addEventListener('click', function() {
        selectedRoute.textContent = this.textContent; // Update selected option text
        selectedRoute.setAttribute('data-value', this.getAttribute('data-value')); // Set data-value attribute
        routeOptions.parentElement.classList.remove('active'); // Close dropdown
    });
 });
 
 // Close dropdown if clicked outside
 document.addEventListener('click', function(event) {
    if (!event.target.closest('.custom-select')) {
        routeOptions.parentElement.classList.remove('active');
    }
 });
 
 // Check Availability functionality
 document.getElementById('bookingForm').addEventListener('submit', function(event) {
    event.preventDefault();
 
    const route = selectedRoute.getAttribute('data-value');
    const date = document.getElementById('date').value;
 
    // Check for bus availability based on selected route and date
    const availability = checkAvailability(route, date);
    
    document.getElementById('availability').innerHTML = availability;
    document.getElementById('seatSelection').classList.remove('hidden');
    renderSeatMap();
 });
 
 function checkAvailability(route, date) {
    if (busData[route] && busData[route][date]) {
        const buses = busData[route][date];
        return `Available buses for ${route} on ${date}: ${buses.join(', ')}`;
    } else {
        return `No buses available for ${route} on ${date}.`;
    }
 }
 
 function renderSeatMap() {
    const seatMap = document.getElementById('seatMap');
    
    // Clear previous seat map
    seatMap.innerHTML = '';
 
    // Simulate seat data (replace with actual seat data)
    const seats = ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'B4'];
    
    seats.forEach(seat => {
        const seatElement = document.createElement('div');
        seatElement.classList.add('seat');
        seatElement.textContent = seat;
        seatElement.addEventListener('click', toggleSeatSelection);
        seatMap.appendChild(seatElement);
    });
 }
 
 const selectedSeats = new Set();
 
 function toggleSeatSelection(event) {
    const seat = event.target;
    seat.classList.toggle('selected');
    
    const seatNumber = seat.textContent;
    if (seat.classList.contains('selected')) {
        selectedSeats.add(seatNumber);
    } else {
        selectedSeats.delete(seatNumber);
    }
 }
 
 document.getElementById('confirmBooking').addEventListener('click', function() {
    document.getElementById('seatSelection').classList.add('hidden');
    document.getElementById('confirmation').classList.remove('hidden');
    
    // Display selected seats or perform booking logic
    console.log('Selected seats:', selectedSeats);
 });