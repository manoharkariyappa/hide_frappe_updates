import frappe


@frappe.whitelist()
def remove_update_notification():
    cache = frappe.cache()

    # Current Frappe update/changelog cache
    cache.set_value("changelog-update-info", "")

    # Clear users marked for update notification
    try:
        cache.delete_key("changelog-update-user-set")
    except Exception:
        pass

    return {"success": True}