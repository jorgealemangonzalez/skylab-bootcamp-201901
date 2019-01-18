// TODO do it nice!
suite('horroy', function () {

    describe('Push success cases', function () {

        it('should add an element to the horroy', function () {

            var horroy = new Horroy();

            horroy.push(7) // [7]

            expect(horroy[0] == 7, 'not expected result')
            expect(horroy.length === 1, 'not expect result')

        });

    });

    describe('Push error cases', function () {

        it('should fail if element is undefined', function () {

            var horroy = new Horroy();
            var error;

            try {
                horroy.push()
            } catch (err) {
                error = err
            }

            expect(error, 'was expect an error')

        });

    });

    describe('Pop success cases', function () {

        it('should add an element to the horroy', function () {

            var horroy = new Horroy();

            horroy.push(7) // [7]

            expect(horroy[0] == 7, 'not expected result')
            expect(horroy.length === 1, 'not expect result')

        });

    });

});