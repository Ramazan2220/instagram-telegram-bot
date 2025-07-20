from telegram_bot.handlers.account_handlers import get_account_handlers
from telegram_bot.handlers.proxy_handlers import get_proxy_handlers
from telegram_bot.handlers.publish import get_publish_handlers
from telegram_bot.handlers.task_handlers import get_task_handlers
from telegram_bot.handlers.group_handlers import get_group_handlers
from telegram_bot.handlers.analytics_handlers import get_analytics_handlers

def get_all_handlers():
    """Возвращает все обработчики"""
    handlers = []
    handlers.extend(get_account_handlers())
    handlers.extend(get_proxy_handlers())
    handlers.extend(get_publish_handlers())
    handlers.extend(get_task_handlers())
    handlers.extend(get_group_handlers())
    handlers.extend(get_analytics_handlers())
    return handlers