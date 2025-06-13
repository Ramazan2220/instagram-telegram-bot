#!/usr/bin/env python3
"""
Валидация всех аккаунтов Instagram в базе данных
Проверяет какие аккаунты рабочие, а какие имеют проблемы
"""

import sys
import os
import json
import time
from datetime import datetime

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from database.db_manager import init_db, get_instagram_accounts
from instagram.client import get_instagram_client

def test_account_connection(account):
    """Тестирует подключение к конкретному аккаунту"""
    print(f"\n🔍 Тестирование: {account.username} (ID: {account.id})")
    
    result = {
        'id': account.id,
        'username': account.username,
        'email': getattr(account, 'email', 'N/A'),
        'is_active': account.is_active,
        'status': 'unknown',
        'error': None,
        'profile_info': None,
        'test_time': datetime.now().isoformat()
    }
    
    try:
        print("   📡 Попытка подключения к Instagram...")
        client = get_instagram_client(account.id)
        
        if client is None:
            result['status'] = 'no_client'
            result['error'] = 'Не удалось создать клиент Instagram'
            print("   ❌ Не удалось создать клиент")
            return result
        
        print("   ✅ Клиент создан успешно")
        print("   📋 Получение информации о профиле...")
        
        # Пытаемся получить информацию о профиле
        profile_info = client.account_info()
        
        if profile_info:
            result['status'] = 'working'
            result['profile_info'] = {
                'username': profile_info.username,
                'full_name': getattr(profile_info, 'full_name', ''),
                'biography': getattr(profile_info, 'biography', ''),
                'follower_count': getattr(profile_info, 'follower_count', 0),
                'following_count': getattr(profile_info, 'following_count', 0),
                'media_count': getattr(profile_info, 'media_count', 0),
                'is_private': getattr(profile_info, 'is_private', False),
                'is_verified': getattr(profile_info, 'is_verified', False)
            }
            print(f"   ✅ РАБОТАЕТ! Подписчиков: {result['profile_info']['follower_count']}")
        else:
            result['status'] = 'no_profile_info'
            result['error'] = 'Не удалось получить информацию о профиле'
            print("   ⚠️ Клиент создан, но профиль недоступен")
            
    except Exception as e:
        error_str = str(e)
        
        # Определяем тип ошибки
        if 'challenge' in error_str.lower():
            result['status'] = 'challenge_required'
            result['error'] = 'Требуется прохождение challenge'
            print("   🔐 Требуется прохождение challenge")
        elif 'login' in error_str.lower():
            result['status'] = 'login_failed'
            result['error'] = 'Ошибка входа в аккаунт'
            print("   ❌ Ошибка входа")
        elif 'banned' in error_str.lower() or 'suspended' in error_str.lower():
            result['status'] = 'banned'
            result['error'] = 'Аккаунт заблокирован'
            print("   🚫 Аккаунт заблокирован")
        else:
            result['status'] = 'error'
            result['error'] = error_str
            print(f"   ❌ Ошибка: {error_str[:100]}...")
    
    return result

def save_validation_report(results):
    """Сохраняет отчет о валидации в файл"""
    report_file = f"account_validation_report_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
    
    report_data = {
        'validation_time': datetime.now().isoformat(),
        'total_accounts': len(results),
        'summary': {
            'working': len([r for r in results if r['status'] == 'working']),
            'challenge_required': len([r for r in results if r['status'] == 'challenge_required']),
            'login_failed': len([r for r in results if r['status'] == 'login_failed']),
            'banned': len([r for r in results if r['status'] == 'banned']),
            'errors': len([r for r in results if r['status'] == 'error']),
            'other': len([r for r in results if r['status'] not in ['working', 'challenge_required', 'login_failed', 'banned', 'error']])
        },
        'accounts': results
    }
    
    try:
        with open(report_file, 'w', encoding='utf-8') as f:
            json.dump(report_data, f, ensure_ascii=False, indent=2)
        print(f"\n💾 Отчет сохранен в файл: {report_file}")
        return report_file
    except Exception as e:
        print(f"\n❌ Ошибка при сохранении отчета: {e}")
        return None

def print_summary_report(results):
    """Выводит краткий отчет о валидации"""
    working = [r for r in results if r['status'] == 'working']
    challenge = [r for r in results if r['status'] == 'challenge_required']
    login_failed = [r for r in results if r['status'] == 'login_failed']
    banned = [r for r in results if r['status'] == 'banned']
    errors = [r for r in results if r['status'] == 'error']
    other = [r for r in results if r['status'] not in ['working', 'challenge_required', 'login_failed', 'banned', 'error']]
    
    print("\n" + "="*70)
    print("📊 СВОДНЫЙ ОТЧЕТ ПО ВАЛИДАЦИИ АККАУНТОВ")
    print("="*70)
    
    print(f"📈 Всего проверено аккаунтов: {len(results)}")
    print()
    
    if working:
        print(f"✅ РАБОЧИЕ АККАУНТЫ ({len(working)}):")
        for acc in working:
            profile = acc.get('profile_info', {})
            followers = profile.get('follower_count', 'N/A')
            print(f"   • {acc['username']} (подписчиков: {followers})")
    
    if challenge:
        print(f"\n🔐 ТРЕБУЮТ CHALLENGE ({len(challenge)}):")
        for acc in challenge:
            print(f"   • {acc['username']}")
    
    if login_failed:
        print(f"\n❌ ОШИБКИ ВХОДА ({len(login_failed)}):")
        for acc in login_failed:
            print(f"   • {acc['username']}")
    
    if banned:
        print(f"\n🚫 ЗАБЛОКИРОВАННЫЕ ({len(banned)}):")
        for acc in banned:
            print(f"   • {acc['username']}")
    
    if errors:
        print(f"\n⚠️ ДРУГИЕ ОШИБКИ ({len(errors)}):")
        for acc in errors:
            print(f"   • {acc['username']}: {acc['error'][:50]}...")
    
    if other:
        print(f"\n❓ НЕОПРЕДЕЛЕННЫЙ СТАТУС ({len(other)}):")
        for acc in other:
            print(f"   • {acc['username']} ({acc['status']})")
    
    print("\n" + "="*70)
    
    # Рекомендации
    if working:
        print("💡 РЕКОМЕНДАЦИИ:")
        print(f"✅ Используйте {len(working)} рабочих аккаунтов для тестирования")
        if challenge:
            print(f"🔐 {len(challenge)} аккаунтов требуют прохождения challenge")
        if login_failed or banned or errors:
            problematic = len(login_failed) + len(banned) + len(errors)
            print(f"⚠️ {problematic} аккаунтов имеют серьезные проблемы")
    else:
        print("❌ НЕТ РАБОЧИХ АККАУНТОВ!")
        print("Необходимо добавить новые аккаунты или решить проблемы с существующими")

def main():
    print("🔍 ВАЛИДАЦИЯ АККАУНТОВ INSTAGRAM")
    print("="*50)
    print("Проверяет все аккаунты в базе данных на работоспособность")
    print("="*50)
    
    # Инициализируем базу данных
    init_db()
    
    # Получаем все аккаунты
    accounts = get_instagram_accounts()
    
    if not accounts:
        print("\n❌ В базе данных нет аккаунтов!")
        print("Сначала добавьте аккаунты через бота.")
        return
    
    print(f"\n📊 Найдено аккаунтов в базе: {len(accounts)}")
    
    # Спрашиваем подтверждение
    confirm = input(f"\nНачать проверку {len(accounts)} аккаунтов? (y/n): ").lower()
    if confirm != 'y':
        print("❌ Проверка отменена")
        return
    
    print(f"\n🚀 Начинаем валидацию {len(accounts)} аккаунтов...")
    print("⏱️ Это может занять несколько минут...")
    
    results = []
    
    for i, account in enumerate(accounts, 1):
        print(f"\n{'='*50}")
        print(f"📍 Аккаунт {i}/{len(accounts)}")
        
        result = test_account_connection(account)
        results.append(result)
        
        # Небольшая пауза между проверками
        if i < len(accounts):
            print("   ⏳ Пауза 2 секунды...")
            time.sleep(2)
    
    # Выводим сводный отчет
    print_summary_report(results)
    
    # Сохраняем отчет
    save_validation_report(results)
    
    # Создаем файл с рабочими аккаунтами
    working_accounts = [r for r in results if r['status'] == 'working']
    if working_accounts:
        working_file = f"working_accounts_{datetime.now().strftime('%Y%m%d_%H%M%S')}.txt"
        try:
            with open(working_file, 'w', encoding='utf-8') as f:
                f.write("# Рабочие аккаунты Instagram\n")
                f.write(f"# Проверено: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n\n")
                for acc in working_accounts:
                    profile = acc.get('profile_info', {})
                    followers = profile.get('follower_count', 0)
                    f.write(f"{acc['id']}:{acc['username']} (подписчиков: {followers})\n")
            print(f"💾 Список рабочих аккаунтов сохранен в: {working_file}")
        except Exception as e:
            print(f"❌ Ошибка при сохранении списка рабочих аккаунтов: {e}")

if __name__ == "__main__":
    main() 