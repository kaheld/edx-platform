(function (window, undefined) {
    describe('Transcripts.MessageManager', function () {
        var handlers = {
                importHandler: ['replace', 'Error: Import failed.'],
                replaceHandler: ['replace', 'Error: Replacing failed.'],
                chooseHandler: ['choose', 'Error: Choosing failed.', 'video_id']
            },
            utils = Transcripts.Utils,
            view, fileUploader, sinonXhr;

        beforeEach(function () {

            var videoListEntryTemplate = readFixtures(
                    'transcripts/metadata-videolist-entry.underscore'
                ),
                foundTemplate = readFixtures(
                    'transcripts/messages/transcripts-found.underscore'
                ),
                videoList, $container;

            fileUploader = Transcripts.FileUploader.prototype;

            setFixtures(
                $("<div>", {id: "metadata-videolist-entry"})
                    .html(videoListEntryTemplate)
            );
            appendSetFixtures(
                $("<script>",
                    {
                        id: "transcripts-found",
                        type: "text/template"
                    }
                ).text(foundTemplate)
            );

            videoList = jasmine.createSpyObj(
                'CMS.Views.Metadata.VideoList',
                ['getVideoObjectsList']
            );
            $container = $('#metadata-videolist-entry');

            spyOn(fileUploader, 'initialize');
            spyOn(console, 'error');
            spyOn(utils.Storage, 'set');

            view = new Transcripts.MessageManager({
                el: $container,
                parent: videoList,
                component_id: 'component_id'
            });
        });

        it('Initialize', function () {
            expect(fileUploader.initialize).toHaveBeenCalledWith({
                el: view.$el,
                messenger: view,
                component_id: view.component_id,
                videoListObject: view.options.parent
            });
        });

        describe('Render', function () {

            beforeEach(function () {
                spyOn(_,'template').andCallThrough();
                spyOn(fileUploader, 'render');
            });

            it('Template doesn\'t exist', function () {
                view.render('incorrect_template_name');

                expect(console.error).toHaveBeenCalled();
                expect(_.template).not.toHaveBeenCalled();
                expect(view.$el.find('.transcripts-status'))
                    .toHaveClass('is-invisible');
                expect(fileUploader.render).not.toHaveBeenCalled();
            });

            it('All works okay if correct data is passed', function () {
                view.render('found');

                expect(console.error).not.toHaveBeenCalled();
                expect(_.template).toHaveBeenCalled();
                expect(view.$el).not.toHaveClass('is-invisible');
                expect(fileUploader.render).toHaveBeenCalled();
            });
        });

        describe('showError', function () {
            var errorMessage ='error',
                $error, $buttons;

            beforeEach(function () {
                view.render('found');
                spyOn(view, 'hideError');
                spyOn(window, 'gettext');
                spyOn($.fn, 'html').andCallThrough();
                $error = view.$el.find('.transcripts-error-message');
                $buttons = view.$el.find('.wrapper-transcripts-buttons');
            });

            it('Error message is not passed', function () {
                view.showError(null);

                expect(view.hideError).not.toHaveBeenCalled();
                expect(window.gettext).not.toHaveBeenCalled();
                expect($error.html).not.toHaveBeenCalled();
                expect($error).toHaveClass('is-invisible');
                expect($buttons).not.toHaveClass('is-invisible');
            });

            it('Show message and buttons', function () {
                view.showError(errorMessage);

                expect(view.hideError).toHaveBeenCalled();
                expect(window.gettext).toHaveBeenCalled();
                expect($error.html).toHaveBeenCalled();
                expect($error).not.toHaveClass('is-invisible');
                expect($buttons).not.toHaveClass('is-invisible');
            });

            it('Show message and hide buttons', function () {
                view.showError(errorMessage, true);

                expect(view.hideError).toHaveBeenCalled();
                expect(window.gettext).toHaveBeenCalled();
                expect($error.html).toHaveBeenCalled();
                expect($error).not.toHaveClass('is-invisible');
                expect($buttons).toHaveClass('is-invisible');
            });
        });

        it('hideError', function () {
            view.render('found');

            var $error = view.$el.find('.transcripts-error-message'),
                $buttons = view.$el.find('.wrapper-transcripts-buttons');

            expect($error).toHaveClass('is-invisible');
            expect($buttons).not.toHaveClass('is-invisible');
        });

        $.each(handlers, function(key, value) {
             it(key, function () {
                var eventObj = jasmine.createSpyObj('event', ['preventDefault']);
                spyOn($.fn, 'data').andReturn('video_id');
                spyOn(view, 'processCommand');
                view[key](eventObj);
                expect(view.processCommand.mostRecentCall.args).toEqual(value);
             });
        });

        describe('processCommand', function () {
            var action = 'replace',
                errorMessage = 'errorMessage',
                videoList = void(0),
                extraParamas = 'video_id';

            beforeEach(function () {
                view.render('found');
                spyOn(utils, 'command').andCallThrough();
                spyOn(view, 'render');
                spyOn(view, 'showError');

                sinonXhr =  sinon.fakeServer.create();
                sinonXhr.autoRespond = true;
            });

            afterEach(function () {
                sinonXhr.restore();
            });

            var assertCommand = function (config, expectFunc) {
                var flag = false,
                    defaults = {
                        action: 'replace',
                        errorMessage: 'errorMessage',
                        extraParamas: void(0)
                    };
                    args = $.extend({}, defaults, config);

                runs(function() {
                    view
                        .processCommand(
                            args.action,
                            args.errorMessage,
                            args.extraParamas
                        )
                        .always(function () { flag = true; });
                });

                waitsFor(function() {
                    return flag;
                }, "Ajax Timeout", 750);


                runs(expectFunc);
            };

            it('Invoke without extraParamas', function () {

                sinonXhr.respondWith([
                    200,
                    { "Content-Type": "application/json"},
                    JSON.stringify({
                      status: 'Success',
                      subs: 'video_id'
                    })
                ]);

                assertCommand(
                    { },
                    function() {
                        expect(utils.command).toHaveBeenCalledWith(
                            action,
                            view.component_id,
                            videoList,
                            void(0)
                        );
                        expect(view.showError).not.toHaveBeenCalled();
                        expect(view.render.mostRecentCall.args[0])
                            .toEqual('found');
                        expect(utils.Storage.set).toHaveBeenCalled();
                    }
                );
            });

            it('Invoke with extraParamas', function () {

                sinonXhr.respondWith([
                    200,
                    { "Content-Type": "application/json"},
                    JSON.stringify({
                      status: 'Success',
                      subs: 'video_id'
                    })
                ]);

                view.processCommand(action, errorMessage, extraParamas);

                assertCommand(
                    { extraParamas : extraParamas },
                    function () {
                        expect(utils.command).toHaveBeenCalledWith(
                            action,
                            view.component_id,
                            videoList,
                            {
                                html5_id: extraParamas
                            }
                        );
                        expect(view.showError).not.toHaveBeenCalled();
                        expect(view.render.mostRecentCall.args[0])
                            .toEqual('found');
                        expect(utils.Storage.set).toHaveBeenCalled();
                    }
                );
            });

            it('status `Error`', function () {

                sinonXhr.respondWith([
                    200,
                    { "Content-Type": "application/json"},
                    JSON.stringify({
                      status: 'Error',
                      subs: ''
                    })
                ]);

                assertCommand(
                    { },
                    function () {
                        expect(utils.command).toHaveBeenCalledWith(
                            action,
                            view.component_id,
                            videoList,
                            void(0)
                        );
                        expect(view.showError).not.toHaveBeenCalled();
                        expect(view.render.mostRecentCall.args[0])
                            .toEqual('not_found');
                        expect(utils.Storage.set).not.toHaveBeenCalled();
                    }
                );

            });

            it('Fail', function () {

                sinonXhr.respondWith([404, {}, '']);

                assertCommand(
                    { },
                    function () {
                        expect(utils.command).toHaveBeenCalledWith(
                            action,
                            view.component_id,
                            videoList,
                            void(0)
                        );
                        expect(view.showError).toHaveBeenCalled();
                        expect(view.render).not.toHaveBeenCalled();
                        expect(utils.Storage.set).not.toHaveBeenCalled();
                    }
                );
            });
        });

    });
}(window));
