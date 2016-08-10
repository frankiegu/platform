var backend = {
    device_url: function(parameters) {
        $.get('/rest/settings/device_domain')
            .done(function (data) {
                if (parameters.hasOwnProperty("done")) {
                    parameters.done(data);
                }
            })
            .fail(function (xhr, textStatus, errorThrown) {
                var error = null;
                if (xhr.hasOwnProperty('responseJSON')) {
                    var error = xhr.responseJSON;
                }
                if (parameters.hasOwnProperty("fail")) {
                    parameters.fail(xhr.status, error);
                }
            })
            .always(function() {
                if (parameters.hasOwnProperty("always")) {
                    parameters.always();
                }
            });
    },

    send_logs: function(parameters) {
        $.get('/rest/send_log')
            .done(function (data) {
                if (parameters.hasOwnProperty("done")) {
                    parameters.done(data);
                }
            })
            .fail(function (xhr, textStatus, errorThrown) {
                var error = null;
                if (xhr.hasOwnProperty('responseJSON')) {
                    var error = xhr.responseJSON;
                }
                if (parameters.hasOwnProperty("fail")) {
                    parameters.fail(xhr.status, error);
                }
            })
            .always(function() {
                if (parameters.hasOwnProperty("always")) {
                    parameters.always();
                }
            });
    },

    reactivate: function() {
        var internal_web = (new URI()).port(81).directory("").filename("").query("");
        window.location.href = internal_web;
    },

    check_access: function(parameters) {
        $.get('/rest/settings/access')
            .done(function (data) {
                if (parameters.hasOwnProperty("done")) {
                    parameters.done(data);
                }
            })
            .fail(function (xhr, textStatus, errorThrown) {
                var error = null;
                if (xhr.hasOwnProperty('responseJSON')) {
                    var error = xhr.responseJSON;
                }
                if (parameters.hasOwnProperty("fail")) {
                    parameters.fail(xhr.status, error);
                }
            })
            .always(function() {
                if (parameters.hasOwnProperty("always")) {
                    parameters.always();
                }
            });
    },

    external_access: function(parameters) {
        var state = parameters.state;
        $.get('/rest/settings/set_external_access?external_access=' + state)
            .done(function (data) {
                if (parameters.hasOwnProperty("done")) {
                    parameters.done(data);
                }
            })
            .fail(function (xhr, textStatus, errorThrown) {
                var error = null;
                if (xhr.hasOwnProperty('responseJSON')) {
                    var error = xhr.responseJSON;
                }
                if (parameters.hasOwnProperty("fail")) {
                    parameters.fail(xhr.status, error);
                }
            })
            .always(function() {
                if (parameters.hasOwnProperty("always")) {
                    parameters.always();
                }
            });
    },

    protocol: function(parameters) {
        var new_protocol = parameters.new_protocol;
        $.get('/rest/settings/set_protocol?protocol=' + new_protocol)
            .done(function (data) {
                if (parameters.hasOwnProperty("done")) {
                    parameters.done(data);
                }
            })
            .fail(function (xhr, textStatus, errorThrown) {
                var error = null;
                if (xhr.hasOwnProperty('responseJSON')) {
                    var error = xhr.responseJSON;
                }
                if (parameters.hasOwnProperty("fail")) {
                    parameters.fail(xhr.status, error);
                }
            })
            .always(function() {
                if (parameters.hasOwnProperty("always")) {
                    parameters.always();
                }
            });
    },

}


function backend_update_disks(on_complete) {
    $.get('/rest/settings/disks')
            .done(function (data) {
                display_disks(data);
                on_complete();
            })
            .fail(onError);
}

function backend_disk_action(disk_device, is_activate, on_complete) {
    var mode = is_activate ? "disk_activate" : "disk_deactivate";
    $.get('/rest/settings/' + mode, {device: disk_device})
            .done(function () {
                backend_update_disks(on_complete);
            })
            .fail(onError);
}

function update_versions(on_complete) {
    $.get('/rest/settings/versions')
            .done(function (data) {
                display_versions(data);
            })
            .fail(onError)
            .always(function() {
            		typeof on_complete === 'function' && on_complete();
            });
}

function backend_check_versions(on_complete) {
    $.get('/rest/check')
            .always(function() {
                run_after_sam_is_complete(function() {
                        update_versions(on_complete);
                });
            });
}

function backend_platform_upgrade(on_complete) {
    $.get('/rest/settings/system_upgrade')
            .always(function() {
                run_after_sam_is_complete(function() {
                    update_versions(on_complete);
                });
            });
}

function backend_sam_upgrade(on_complete) {
    $.get('/rest/settings/sam_upgrade')
            .always(function() {
                run_after_sam_is_complete(function() {
                    update_versions(on_complete);
                });
            });
}