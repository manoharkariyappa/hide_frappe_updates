// $(document).on("startup", function () {
//     frappe.call({
//         method: "hide_frappe_updates.api.remove_update_notification"
//     });
// });


(function () {
    "use strict";

    // -----------------------------------------
    // Hide Frappe update/version popups
    // -----------------------------------------

    const blockedMessages = [
        "Version Updated",
        "The application has been updated to a new version",
        "Your system is being updated",
        "New updates are available",
        "Updated To A New Version",
        "Updated to a new version",
        "Please refresh this page",
        "Please refresh to get the latest"
    ];

    function isBlockedMessage(message) {
        if (!message) {
            return false;
        }

        const text = String(message).toLowerCase();

        return blockedMessages.some(function (item) {
            return text.includes(item.toLowerCase());
        });
    }

    // -----------------------------------------
    // Block frappe.msgprint()
    // -----------------------------------------

    const originalMsgprint = frappe.msgprint;

    frappe.msgprint = function (message, ...args) {
        let text = message;

        if (typeof message === "object" && message !== null) {
            text =
                message.message ||
                message.title ||
                message.indicator ||
                "";
        }

        if (isBlockedMessage(text)) {
            console.log(
                "[hide_frappe_updates] Blocked:",
                text
            );
            return;
        }

        return originalMsgprint.call(this, message, ...args);
    };


    // -----------------------------------------
    // Remove update/version dialogs already
    // displayed by Frappe
    // -----------------------------------------

    function removeBlockedDialogs() {
        $(".modal").each(function () {
            const $modal = $(this);

            const text = $modal.text();

            if (isBlockedMessage(text)) {
                console.log(
                    "[hide_frappe_updates] Removing popup:",
                    text
                );

                $modal.modal("hide");
            }
        });
    }


    // Check shortly after Desk starts
    $(document).on("startup", function () {
        removeBlockedDialogs();

        setTimeout(removeBlockedDialogs, 100);
        setTimeout(removeBlockedDialogs, 500);
        setTimeout(removeBlockedDialogs, 1000);
        setTimeout(removeBlockedDialogs, 2000);
    });


    // -----------------------------------------
    // Clear Frappe update cache
    // -----------------------------------------

    frappe.call({
        method: "hide_frappe_updates.api.remove_update_notification",
        callback: function (r) {
            console.log(
                "[hide_frappe_updates] Update notification cleared"
            );
        }
    });

})();