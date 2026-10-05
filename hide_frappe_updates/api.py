import frappe


@frappe.whitelist()
def remove_update_notification():
    cache = frappe.cache()

    # Clear update notification data
    cache.set_value("changelog-update-info", "")

    # Clear users who have update notifications
    cache.delete_key("changelog-update-user-set")

    return {"success": True}