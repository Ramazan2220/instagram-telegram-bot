#!/usr/bin/env python3
"""
Главный тестовый файл для всех модулей profile_setup
Позволяет запускать тесты по отдельности или все сразу
"""

import sys
import subprocess
from test_profile_setup_base import get_test_account, test_instagram_connection

def run_test_file(test_file):
    """Запускает указанный тестовый файл"""
    print(f"\n{'='*60}")
    print(f"🚀 ЗАПУСК ТЕСТА: {test_file}")
    print(f"{'='*60}")
    
    try:
        result = subprocess.run([sys.executable, test_file], 
                              capture_output=False, 
                              text=True)
        return result.returncode == 0
    except Exception as e:
        print(f"❌ Ошибка при запуске теста {test_file}: {e}")
        return False

def main():
    print("🧪 ТЕСТИРОВАНИЕ МОДУЛЕЙ PROFILE_SETUP")
    print("="*60)
    print("Этот инструмент поможет протестировать все модули")
    print("оформления профилей Instagram по отдельности")
    print("="*60)
    
    # Проверяем доступность тестового аккаунта
    print("\n🔍 Проверка доступности тестовых аккаунтов...")
    account = get_test_account()
    if not account:
        print("\n❌ Нет доступных аккаунтов для тестирования!")
        print("Сначала добавьте аккаунт через бота.")
        return
    
    # Проверяем подключение к Instagram
    client = test_instagram_connection(account)
    if not client:
        print("\n❌ Невозможно подключиться к Instagram!")
        print("Проверьте статус аккаунта и попробуйте снова.")
        return
    
    print(f"\n✅ Готов к тестированию с аккаунтом: {account.username}")
    
    # Список доступных тестов
    tests = {
        "1": {
            "name": "Изменение имени профиля",
            "file": "test_name_manager.py",
            "module": "name_manager.py"
        },
        "2": {
            "name": "Изменение биографии",
            "file": "test_bio_manager.py",
            "module": "bio_manager.py"
        },
        "3": {
            "name": "Изменение ссылок профиля",
            "file": "test_links_manager.py",
            "module": "links_manager.py"
        },
        "4": {
            "name": "Изменение username (НЕ РЕКОМЕНДУЕТСЯ)",
            "file": "test_username_manager.py",
            "module": "username_manager.py",
            "warning": "⚠️ ОСТОРОЖНО: Может заблокировать аккаунт!"
        },
        "5": {
            "name": "Изменение фото профиля",
            "file": "test_avatar_manager.py", 
            "module": "avatar_manager.py",
            "note": "📝 Требует загрузки изображения"
        },
        "6": {
            "name": "Публикация постов",
            "file": "test_post_manager.py",
            "module": "post_manager.py",
            "note": "📝 Требует медиафайлов"
        },
        "7": {
            "name": "Очистка профиля",
            "file": "test_cleanup_manager.py",
            "module": "cleanup_manager.py",
            "warning": "⚠️ ОСТОРОЖНО: Удаляет все посты!"
        }
    }
    
    while True:
        print("\n" + "="*60)
        print("📋 ДОСТУПНЫЕ ТЕСТЫ:")
        print("="*60)
        
        for key, test in tests.items():
            print(f"{key}. {test['name']}")
            if 'warning' in test:
                print(f"   {test['warning']}")
            if 'note' in test:
                print(f"   {test['note']}")
        
        print("\n🔧 ДОПОЛНИТЕЛЬНЫЕ ОПЦИИ:")
        print("all. Запустить все БЕЗОПАСНЫЕ тесты (1-3)")
        print("exit. Выход")
        
        try:
            choice = input("\nВыберите тест для запуска: ").strip().lower()
            
            if choice == "exit":
                print("\n👋 До свидания!")
                break
            
            elif choice == "all":
                print("\n🚀 ЗАПУСК ВСЕХ БЕЗОПАСНЫХ ТЕСТОВ...")
                safe_tests = ["1", "2", "3"]  # Только безопасные тесты
                
                results = {}
                for test_key in safe_tests:
                    test_info = tests[test_key]
                    print(f"\n📍 Тест {test_key}: {test_info['name']}")
                    
                    confirm = input("Продолжить? (y/n, Enter=да): ").strip().lower()
                    if confirm in ['n', 'no']:
                        print("⏭️ Тест пропущен")
                        results[test_key] = "пропущен"
                        continue
                    
                    success = run_test_file(test_info['file'])
                    results[test_key] = "✅ успешно" if success else "❌ ошибка"
                
                # Отчет по всем тестам
                print("\n" + "="*60)
                print("📊 ИТОГОВЫЙ ОТЧЕТ:")
                print("="*60)
                for test_key, result in results.items():
                    test_name = tests[test_key]['name']
                    print(f"{test_key}. {test_name}: {result}")
            
            elif choice in tests:
                test_info = tests[choice]
                
                print(f"\n🎯 Выбран тест: {test_info['name']}")
                print(f"📄 Модуль: {test_info['module']}")
                
                if 'warning' in test_info:
                    print(f"\n{test_info['warning']}")
                    confirm = input("Вы ТОЧНО хотите продолжить? (yes/no): ")
                    if confirm.lower() != "yes":
                        print("❌ Тест отменен для безопасности")
                        continue
                
                if 'note' in test_info:
                    print(f"\n💡 {test_info['note']}")
                
                run_test_file(test_info['file'])
            
            else:
                print("❌ Неверный выбор. Попробуйте еще раз.")
                
        except KeyboardInterrupt:
            print("\n\n🛑 Тестирование прервано пользователем")
            break
        except Exception as e:
            print(f"\n❌ Ошибка: {e}")

if __name__ == "__main__":
    main() 