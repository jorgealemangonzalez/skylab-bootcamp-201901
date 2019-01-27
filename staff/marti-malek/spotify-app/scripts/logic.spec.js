spotifyApi.token= 'BQAc-S20Y7d0Ae34ZVjtFvrJN9plo2bMR8xcAk3xV6JB8Qt6a4e9yGRmvZozsyg6Jx_iBGK2u1E71risbpWMe8lwcZo5phXi-Gb3z8Ss7uuxKlCu6XCY2MKGwH4iJUiAnWzBuom5wz5RT6XSyRNpmIS11G2hn-hyGA'

describe('logic', function() {
    describe('search artists', function() {
        it('should succeed on matching query', function(done) {
            const query = 'madonna'

            logic.searchArtists(query, function(error,artists) {
                expect(error).toBeUndefined()

                expect(artists).toBeDefined()
                expect(artists instanceof Array).toBeTruthy()
                expect(artists.length).toBeGreaterThan(0)

                artists.forEach(({name}) => expect(name.toLowerCase()).toContain(query))

                done()
            })
        })
        it('should fail on empty query', function() {
            const query = ''

            expect(() => logic.searchArtists(query, function(error,artists) {})).toThrowError('query is empty')
        })
    })
    describe('login', function() {
        it('should succeed with correct credentials', function() {
            var expected = users.find(function (user) { return user.email === 'johndoe@mail.com'; });

            var loggedInUser;

            logic.login(expected.email, expected.password, function(user) {
                loggedInUser = user
            })

            expect(loggedInUser).toBeDefined()
            expect(loggedInUser.email).toEqual(expected.email)
            expect(loggedInUser.password).toBeUndefined();
            expect(loggedInUser).not.toEqual(expected);
        })
        it('should fail on wrong email', function() {
            var inventedEmail = 'hola@mail.com'

            expect(function () {
                logic.login(inventedEmail, '123', function() {})
            }).toThrow(Error('user ' + inventedEmail + ' not found'))
        })
        it('should fail on wrong password', function() {
            expect(function () {
                logic.login('johndoe@mail.com', '123', function() {})
            }).toThrow(Error('wrong password'))
        })
    })
    describe('register', function () {
        var registeringEmail = 'jw@mail.com';

        beforeEach(function () {
            var userIndex = users.findIndex(function (user) { return user.email === registeringEmail; });

            if (userIndex > -1)
                users.splice(userIndex, 1);
        })

        it('should succeed on valid data', function () {
            var registered;

            var registeringName = 'John';
            var registeringSurname = 'Wayne';
            var registeringPassword = 'p4ssw0rd';

            logic.register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
                registered = true;
            });

            expect(registered).toBeTruthy();

            var registeredUser = users.find(function (user) { return user.email === registeringEmail; });

            expect(registeredUser).toBeDefined();
            expect(registeredUser.email).toEqual(registeringEmail);
            expect(registeredUser.name).toEqual(registeringName);
            expect(registeredUser.surname).toEqual(registeringSurname);
            expect(registeredUser.password).toEqual(registeringPassword);
        })
        it('should fail on undefined name', function () {
            var registered;

            var registeringName = undefined;
            var registeringSurname = 'Wayne';
            var registeringEmail = 'jw@mail.com';
            var registeringPassword = 'p4ssw0rd';

            expect(function () {
                logic.register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
                    registered = true;
                });
            }).toThrow(TypeError(registeringName + ' is not a string'));

            expect(registered).toBeUndefined();
        });

        it('should fail on numeric name', function () {
            var registered;

            var registeringName = 10;
            var registeringSurname = 'Wayne';
            var registeringEmail = 'jw@mail.com';
            var registeringPassword = 'p4ssw0rd';

            expect(function () {
                logic.register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
                    registered = true;
                });
            }).toThrow(TypeError(registeringName + ' is not a string'));

            expect(registered).toBeUndefined();
        });


        it('should fail on boolean name', function () {
            var registered;

            var registeringName = true;
            var registeringSurname = 'Wayne';
            var registeringEmail = 'jw@mail.com';
            var registeringPassword = 'p4ssw0rd';

            expect(function () {
                logic.register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
                    registered = true;
                });
            }).toThrow(TypeError(registeringName + ' is not a string'));

            expect(registered).toBeUndefined();
        });

        it('should fail on object name', function () {
            var registered;

            var registeringName = {};
            var registeringSurname = 'Wayne';
            var registeringEmail = 'jw@mail.com';
            var registeringPassword = 'p4ssw0rd';

            expect(function () {
                logic.register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
                    registered = true;
                });
            }).toThrow(TypeError(registeringName + ' is not a string'));

            expect(registered).toBeUndefined();
        });

        it('should fail on array name', function () {
            var registered;

            var registeringName = [];
            var registeringSurname = 'Wayne';
            var registeringEmail = 'jw@mail.com';
            var registeringPassword = 'p4ssw0rd';

            expect(function () {
                logic.register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
                    registered = true;
                });
            }).toThrow(TypeError(registeringName + ' is not a string'));

            expect(registered).toBeUndefined();
        });

        it('should fail on empty name', function () {
            var registered;

            var registeringName = '';
            var registeringSurname = 'Wayne';
            var registeringEmail = 'jw@mail.com';
            var registeringPassword = 'p4ssw0rd';

            expect(function () {
                logic.register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
                    registered = true;
                });
            }).toThrow(Error('name cannot be empty'));

            expect(registered).toBeUndefined();
        });

        it('should fail on undefined surname', function () {
            var registered;

            var registeringName = 'John';
            var registeringSurname = undefined;
            var registeringEmail = 'jw@mail.com';
            var registeringPassword = 'p4ssw0rd';

            expect(function () {
                logic.register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
                    registered = true;
                });
            }).toThrow(TypeError(registeringSurname + ' is not a string'));

            expect(registered).toBeUndefined();
        });

        it('should fail on numeric surname', function () {
            var registered;

            var registeringName = 'John';
            var registeringSurname = 10;
            var registeringEmail = 'jw@mail.com';
            var registeringPassword = 'p4ssw0rd';

            expect(function () {
                logic.register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
                    registered = true;
                });
            }).toThrow(TypeError(registeringSurname + ' is not a string'));

            expect(registered).toBeUndefined();
        });


        it('should fail on boolean surname', function () {
            var registered;

            var registeringName = 'John';
            var registeringSurname = false;
            var registeringEmail = 'jw@mail.com';
            var registeringPassword = 'p4ssw0rd';

            expect(function () {
                logic.register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
                    registered = true;
                });
            }).toThrow(TypeError(registeringSurname + ' is not a string'));

            expect(registered).toBeUndefined();
        });

        it('should fail on object surname', function () {
            var registered;

            var registeringName = 'John';
            var registeringSurname = {};
            var registeringEmail = 'jw@mail.com';
            var registeringPassword = 'p4ssw0rd';

            expect(function () {
                logic.register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
                    registered = true;
                });
            }).toThrow(TypeError(registeringSurname + ' is not a string'));

            expect(registered).toBeUndefined();
        });

        it('should fail on array surname', function () {
            var registered;

            var registeringName = 'John';
            var registeringSurname = [];
            var registeringEmail = 'jw@mail.com';
            var registeringPassword = 'p4ssw0rd';

            expect(function () {
                logic.register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
                    registered = true;
                });
            }).toThrow(TypeError(registeringSurname + ' is not a string'));

            expect(registered).toBeUndefined();
        });

        it('should fail on empty surname', function () {
            var registered;

            var registeringName = 'John';
            var registeringSurname = '';
            var registeringEmail = 'jw@mail.com';
            var registeringPassword = 'p4ssw0rd';

            expect(function () {
                logic.register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
                    registered = true;
                });
            }).toThrow(Error('surname cannot be empty'));

            expect(registered).toBeUndefined();
        });
    })
    describe('searchArtists', function() {
        it('should succeed with matching query', function(done) {
            const query = 'madonna'
            logic.searchArtists(query, function(error, artists) {

                expect(error).toBeUndefined()
                expect(artists instanceof Array).toBe(true)
                expect(artists.length > 0).toBe(true)
                artists.forEach(({ name }) => expect(name.toLowerCase()).toContain(query))

                done()
            })
        })
        it('should fail on empty query', function(done) {
            const query = ''

            expect(function() {
                logic.searchArtists(query, function(error, artists) {})}
                ).toThrowError('query is empty')
            done()
        })
        it('should fail on string callback', function(done) {
            const query = 'madonna'
            const callback = 'string'

            expect(function() {
                logic.searchArtists(query, callback)}
                ).toThrowError(`${callback} is not a function`)
            done()
        })
        it('should fail on number callback', function(done) {
            const query = 'madonna'
            const callback = 4

            expect(function() {
                logic.searchArtists(query, callback)}
                ).toThrowError(`${callback} is not a function`)
            done()
        })
        it('should fail on boolean callback', function(done) {
            const query = 'madonna'
            const callback = true

            expect(function() {
                logic.searchArtists(query, callback)}
                ).toThrowError(`${callback} is not a function`)
            done()
        })
        it('should fail on object callback', function(done) {
            const query = 'madonna'
            const callback = {}

            expect(function() {
                logic.searchArtists(query, callback)}
                ).toThrowError(`${callback} is not a function`)
            done()
        })
    })
    describe('retrieveAlbums', function() {
        it('should succeed on mathcing id', function(done) {

            const query = "6tbjWDEIzxoDsBA1FuhfPW"

            logic.retrieveAlbums(query, function(error, albums) {
                expect(error).toBeUndefined()
                expect(albums instanceof Array).toBeTruthy()
                expect(albums.length > 0).toBeTruthy()

                done()
            })
        })
        it('should fail on empty query', function(done) {
            const query = ''

            expect(function() {
                logic.retrieveAlbums(query, function(error, albums) {})}
                ).toThrowError('query is empty')
            done()
        })
        it('should fail on string callback', function(done) {
            const query = "6tbjWDEIzxoDsBA1FuhfPW"
            const callback = 'string'

            expect(function() {
                logic.retrieveAlbums(query, callback)}
                ).toThrowError(`${callback} is not a function`)
            done()
        })
        it('should fail on number callback', function(done) {
            const query = "6tbjWDEIzxoDsBA1FuhfPW"
            const callback = 4

            expect(function() {
                logic.retrieveAlbums(query, callback)}
                ).toThrowError(`${callback} is not a function`)
            done()
        })
        it('should fail on boolean callback', function(done) {
            const query = "6tbjWDEIzxoDsBA1FuhfPW"
            const callback = true

            expect(function() {
                logic.retrieveAlbums(query, callback)}
                ).toThrowError(`${callback} is not a function`)
            done()
        })
        it('should fail on object callback', function(done) {
            const query = "6tbjWDEIzxoDsBA1FuhfPW"
            const callback = {}

            expect(function() {
                logic.retrieveAlbums(query, callback)}
                ).toThrowError(`${callback} is not a function`)
            done()
        })
    })
    describe('retrieveTracks', function() {
        it('should succeed on mathcing id', function(done) {

            const query = "4hBA7VgOSxsWOf2N9dJv2X"

            logic.retrieveTracks(query, function(error, albums) {
                expect(error).toBeUndefined()
                expect(albums instanceof Array).toBeTruthy()
                expect(albums.length > 0).toBeTruthy()

                done()
            })
        })
        it('should fail on empty query', function(done) {
            const query = ''

            expect(function() {
                logic.retrieveTracks(query, function(error, albums) {})}
                ).toThrowError('query is empty')
            done()
        })
        it('should fail on string callback', function(done) {
            const query = "4hBA7VgOSxsWOf2N9dJv2X"
            const callback = 'string'

            expect(function() {
                logic.retrieveTracks(query, callback)}
                ).toThrowError(`${callback} is not a function`)
            done()
        })
        it('should fail on number callback', function(done) {
            const query = "4hBA7VgOSxsWOf2N9dJv2X"
            const callback = 4

            expect(function() {
                logic.retrieveTracks(query, callback)}
                ).toThrowError(`${callback} is not a function`)
            done()
        })
        it('should fail on boolean callback', function(done) {
            const query = "4hBA7VgOSxsWOf2N9dJv2X"
            const callback = true

            expect(function() {
                logic.retrieveTracks(query, callback)}
                ).toThrowError(`${callback} is not a function`)
            done()
        })
        it('should fail on object callback', function(done) {
            const query = "4hBA7VgOSxsWOf2N9dJv2X"
            const callback = {}

            expect(function() {
                logic.retrieveTracks(query, callback)}
                ).toThrowError(`${callback} is not a function`)
            done()
        })
    })
    describe('retrieveSong', function() {
        it('should succeed on mathcing id', function(done) {

            const query = "0QV3swr7L8MZr72lL2izV1"

            logic.retrieveSong(query, function(error, song) {
                expect(error).toBeUndefined()
                expect(song instanceof Object).toBeTruthy()

                done()
            })
        })
        it('should fail on empty query', function(done) {
            const query = ''

            expect(function() {
                logic.retrieveSong(query, function(error, song) {})}
                ).toThrowError('query is empty')
            done()
        })
        it('should fail on string callback', function(done) {
            const query = "0QV3swr7L8MZr72lL2izV1"
            const callback = 'string'

            expect(function() {
                logic.retrieveSong(query, callback)}
                ).toThrowError(`${callback} is not a function`)
            done()
        })
        it('should fail on number callback', function(done) {
            const query = "0QV3swr7L8MZr72lL2izV1"
            const callback = 4

            expect(function() {
                logic.retrieveSong(query, callback)}
                ).toThrowError(`${callback} is not a function`)
            done()
        })
        it('should fail on boolean callback', function(done) {
            const query = "0QV3swr7L8MZr72lL2izV1"
            const callback = true

            expect(function() {
                logic.retrieveSong(query, callback)}
                ).toThrowError(`${callback} is not a function`)
            done()
        })
        it('should fail on object callback', function(done) {
            const query = "0QV3swr7L8MZr72lL2izV1"
            const callback = {}

            expect(function() {
                logic.retrieveSong(query, callback)}
                ).toThrowError(`${callback} is not a function`)
            done()
        })
    })
})