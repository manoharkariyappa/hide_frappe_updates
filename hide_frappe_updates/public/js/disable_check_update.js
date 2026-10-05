$(document).on("startup", function () {
    frappe.call({
        method: "disable_check_update.api.remove_update_notification"
    });
});
