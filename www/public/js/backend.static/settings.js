var backend = {
    device_data: {
      "device_domain": "test.syncloud.it",
      "success": true
    },

    access_data: {
      "data": {
        "external_access": true,
        "protocol": "https"
      },
      "success": true
    },

    versions_data: {
      "data": [
        {
          "app": {
            "id": "platform",
            "name": "Platform",
            "required": true,
            "ui": false,
            "url": "http://platform.odroid-c2.syncloud.it"
          },
          "current_version": "880",
          "installed_version": "876"
        },
        {
          "app": {
            "id": "sam",
            "name": "Syncloud App Manager",
            "required": true,
            "ui": false,
            "url": "http://sam.odroid-c2.syncloud.it"
          },
          "current_version": "78",
          "installed_version": "75"
        }
      ],
      "success": true
    },

    disks_data: {
      "disks": [
        {
          "name": "My Passport 0837",
          "partitions": [
            {
              "active": true,
              "device": "/dev/sdb1",
              "fs_type": "ntfs",
              "mount_point": "/opt/disk/external",
              "mountable": true,
              "size": "931.5G"
            }
          ]
        },
        {
          "name": "My Passport 0990",
          "partitions": [
            {
              "active": false,
              "device": "/dev/sdc1",
              "fs_type": "ntfs",
              "mount_point": "",
              "mountable": true,
              "size": "931.5G"
            }
          ]
        }
      ],
      "success": true
    },

    boot_disk_data: {
      "data": {
          "device": "/dev/mmcblk0p2",
          "size": "2G",
          "extendable": true
        },
      "success": true
    },

    device_url: function(on_complete, on_error) {
        var that = this;
        setTimeout(function() { on_complete(that.device_data); }, 2000);
    },

    send_logs: function(include_support, on_always, on_error) {
        setTimeout(on_always, 2000);
    },

    reactivate: function() {
        window.location.href = "activate.html";
    },

    get_versions: function(on_complete, on_always, on_error) {
        var that = this;
        setTimeout(function() { 
            on_complete(that.versions_data); 
            on_always();
        }, 2000);
    },

    check_versions: function(on_always, on_error) {
        setTimeout(on_always, 2000);
    },

    platform_upgrade: function(on_complete, on_error) {
        setTimeout(on_complete({success: true}), 2000);
    },

    boot_extend: function(on_complete, on_error) {
        var that = this;
        setTimeout(function() {
            that.boot_disk_data.data.extendable = false;
            that.boot_disk_data.data.size = '16G';
            on_complete({success: true});
        }, 2000);
    },

    sam_upgrade: function(on_complete, on_error) {
        setTimeout(function() { on_complete({success: true}) }, 2000);
    },

    update_disks: function(on_complete, on_error) {
        var that = this;
        setTimeout(function() { on_complete(that.disks_data); }, 2000);
    },

    update_boot_disk: function(on_complete, on_error) {
        var that = this;
        setTimeout(function() { on_complete(that.boot_disk_data); }, 2000);
    },

    disk_action: function(disk_device, is_activate, on_complete, on_error) {
        var that = this;
        setTimeout(function() { on_complete(that.disks_data); }, 2000);
    },
    
    job_status: function (job, on_complete, on_error) {
        setTimeout(function() { on_complete({success: true, is_running: false}) }, 2000);
    }

};