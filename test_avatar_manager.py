#!/usr/bin/env python3
"""
Тест модуля profile_setup/avatar_manager.py
Тестирует изменение фото профиля Instagram
"""

import os
import sys
from test_profile_setup_base import get_test_account, test_instagram_connection, format_result
from instagram.profile_manager import ProfileManager

def test_current_avatar(account):
    """Получает информацию о текущем фото профиля"""
    print(f"\n📸 Получение информации о фото профиля для {account.username}...")
    
    try:
        profile_manager = ProfileManager(account.id)
        profile_info = profile_manager.get_profile_info()
        
        if profile_info:
            has_avatar = getattr(profile_info, 'profile_pic_url', '') != ''
            print(f"📋 Фото профиля: {'✅ Установлено' if has_avatar else '❌ Не установлено'}")
            return has_avatar
        else:
            print("❌ Не удалось получить информацию о профиле")
            return None
    except Exception as e:
        print(f"❌ Ошибка при получении информации о профиле: {e}")
        return None

def test_update_avatar(account, photo_path):
    """Тестирует обновление фото профиля"""
    print(f"\n🔄 Тестирование обновления фото профиля из файла: {photo_path}...")
    
    if not os.path.exists(photo_path):
        return format_result(False, f"Файл не найден: {photo_path}", "Обновление фото профиля")
    
    try:
        profile_manager = ProfileManager(account.id)
        success, result = profile_manager.update_profile_picture(photo_path)
        
        return format_result(success, result, "Обновление фото профиля")
    except Exception as e:
        return format_result(False, str(e), "Обновление фото профиля")

def test_remove_avatar(account):
    """Тестирует удаление фото профиля"""
    print(f"\n🗑️ Тестирование удаления фото профиля...")
    
    try:
        profile_manager = ProfileManager(account.id)
        success, result = profile_manager.remove_profile_picture()
        
        return format_result(success, result, "Удаление фото профиля")
    except Exception as e:
        return format_result(False, str(e), "Удаление фото профиля")

def create_test_image():
    """Создает тестовое изображение для фото профиля"""
    try:
        from PIL import Image, ImageDraw
        
        # Создаем простое тестовое изображение 400x400
        img = Image.new('RGB', (400, 400), color='lightblue')
        draw = ImageDraw.Draw(img)
        
        # Рисуем простой паттерн
        draw.rectangle([50, 50, 350, 350], fill='white', outline='blue', width=3)
        draw.text((150, 180), "TEST", fill='black')
        draw.text((130, 220), "AVATAR", fill='black')
        
        test_image_path = "test_avatar.jpg"
        img.save(test_image_path, "JPEG")
        print(f"✅ Создано тестовое изображение: {test_image_path}")
        return test_image_path
    except ImportError:
        print("❌ Библиотека PIL не установлена. Используйте: pip install Pillow")
        return None
    except Exception as e:
        print(f"❌ Ошибка при создании тестового изображения: {e}")
        return None

def main():
    print("🧪 ТЕСТ МОДУЛЯ: profile_setup/avatar_manager.py")
    print("="*50)
    
    # Получаем тестовый аккаунт
    account = get_test_account()
    if not account:
        return
    
    # Проверяем подключение
    client = test_instagram_connection(account)
    if not client:
        return
    
    # Показываем текущий статус фото профиля
    has_current_avatar = test_current_avatar(account)
    if has_current_avatar is None:
        return
    
    print("\n" + "="*50)
    print("🎯 ТЕСТИРОВАНИЕ ФОТО ПРОФИЛЯ")
    print("="*50)
    
    print("\nВыберите тест:")
    print("1. Обновить фото профиля (создать тестовое изображение)")
    print("2. Обновить фото профиля (использовать свой файл)")
    print("3. Удалить фото профиля")
    print("4. Полный тест (обновить + удалить)")
    
    try:
        choice = input("\nВыберите тест (1-4, Enter для пропуска): ").strip()
        
        if choice == "":
            print("\n⏭️ Тест пропущен пользователем")
            return
        elif choice == "1":
            # Создаем тестовое изображение
            test_image_path = create_test_image()
            if test_image_path:
                print(f"\n🧪 Тест: обновление фото профиля тестовым изображением")
                
                if test_update_avatar(account, test_image_path):
                    print(f"\n✅ Тест УСПЕШНО - Фото профиля обновлено")
                    
                    # Проверяем результат
                    print("\n🔍 Проверка изменений...")
                    has_avatar_after = test_current_avatar(account)
                    
                    if has_avatar_after:
                        print("✅ Верификация: Фото профиля успешно установлено в Instagram!")
                    else:
                        print("⚠️ Верификация: Фото может еще обрабатываться Instagram")
                else:
                    print(f"\n❌ Тест ОШИБКА - Не удалось обновить фото профиля")
                
                # Удаляем тестовый файл
                try:
                    os.remove(test_image_path)
                    print(f"🧹 Тестовый файл {test_image_path} удален")
                except:
                    pass
        
        elif choice == "2":
            # Используем пользовательский файл
            photo_path = input("Введите путь к файлу изображения: ").strip()
            if photo_path:
                print(f"\n🧪 Тест: обновление фото профиля файлом {photo_path}")
                
                if test_update_avatar(account, photo_path):
                    print(f"\n✅ Тест УСПЕШНО - Фото профиля обновлено")
                else:
                    print(f"\n❌ Тест ОШИБКА - Не удалось обновить фото профиля")
        
        elif choice == "3":
            # Удаляем фото профиля
            if not has_current_avatar:
                print("\n⚠️ У аккаунта нет фото профиля для удаления")
                return
            
            confirm = input("\n⚠️ Удалить текущее фото профиля? (y/n): ").lower()
            if confirm == 'y':
                print(f"\n🧪 Тест: удаление фото профиля")
                
                if test_remove_avatar(account):
                    print(f"\n✅ Тест УСПЕШНО - Фото профиля удалено")
                    
                    # Проверяем результат
                    print("\n🔍 Проверка изменений...")
                    has_avatar_after = test_current_avatar(account)
                    
                    if not has_avatar_after:
                        print("✅ Верификация: Фото профиля успешно удалено из Instagram!")
                    else:
                        print("⚠️ Верификация: Изменения могут еще обрабатываться Instagram")
                else:
                    print(f"\n❌ Тест ОШИБКА - Не удалось удалить фото профиля")
        
        elif choice == "4":
            # Полный тест
            print(f"\n🧪 Полный тест: обновление + удаление фото профиля")
            
            # Создаем тестовое изображение
            test_image_path = create_test_image()
            if not test_image_path:
                return
            
            # 1. Обновляем фото
            print("\n📸 Этап 1: Обновление фото профиля")
            if test_update_avatar(account, test_image_path):
                print("✅ Фото профиля обновлено")
                
                # 2. Удаляем фото
                print("\n🗑️ Этап 2: Удаление фото профиля")
                if test_remove_avatar(account):
                    print("✅ Фото профиля удалено")
                    print("\n🎉 Полный тест УСПЕШНО завершен!")
                else:
                    print("❌ Не удалось удалить фото профиля")
            else:
                print("❌ Не удалось обновить фото профиля")
            
            # Удаляем тестовый файл
            try:
                os.remove(test_image_path)
                print(f"🧹 Тестовый файл {test_image_path} удален")
            except:
                pass
        
        else:
            print("❌ Неверный выбор")
            return
            
    except ValueError:
        print("❌ Неверный ввод")
    except KeyboardInterrupt:
        print("\n🛑 Тестирование отменено")
    
    print("\n" + "="*50)
    print("🏁 ТЕСТИРОВАНИЕ ЗАВЕРШЕНО")
    print("="*50)

if __name__ == "__main__":
    main() 