$(document).on("startup", function () {
    frappe.call({
        method: "hide_frappe_updates.api.remove_update_notification"
    });
});
