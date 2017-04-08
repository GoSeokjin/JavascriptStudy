'use strict';
//테스트 대상 코드
function createReservation(passenger , flight){
    return {
        passengerInfo : passenger,
        flightInformation : flight
    }
}
//테스트 코드
describe('createReservation(passenger , flight)', function () {
    it('주어진 passenger를 passengerInfo 에 할당한다', function () {
        var testPassenger = {
            firstName: '윤지',
            lasteName: '김'
        };
        var testFlight = {
            number: '3443',
            carrier: '대한항공',
            destination: '울산'
        };
        var reservation = createReservation(testPassenger , testFlight);
        expect(reservation.passengerInfo).toBe(testPassenger);
    })
});
