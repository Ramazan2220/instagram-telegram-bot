#!/usr/bin/env python3
"""
Тест модуля profile_setup/post_manager.py
Тестирует публикацию постов в Instagram
"""

import os
import sys
from test_profile_setup_base import get_test_account, test_instagram_connection, format_result
from instagram.profile_manager import ProfileManager

def test_current_posts(account):
    """Получает информацию о текущих постах"""
    print(f"\n📊 Получение информации о постах для {account.username}...")
    
    try:
        profile_manager = ProfileManager(account.id)
        profile_info = profile_manager.get_profile_info()
        
        if profile_info:
            media_count = getattr(profile_info, 'media_count', 0)
            print(f"📋 Количество постов: {media_count}")
            return media_count
        else:
            print("❌ Не удалось получить информацию о профиле")
            return None
    except Exception as e:
        print(f"❌ Ошибка при получении информации о профиле: {e}")
        return None

def test_upload_photo(account, photo_path, caption=""):
    """Тестирует публикацию фото поста"""
    print(f"\n📷 Тестирование публикации фото: {photo_path}...")
    print(f"📝 Подпись: '{caption}'")
    
    if not os.path.exists(photo_path):
        return format_result(False, f"Файл не найден: {photo_path}", "Публикация фото")
    
    try:
        profile_manager = ProfileManager(account.id)
        success, result = profile_manager.upload_photo(photo_path, caption)
        
        return format_result(success, result, "Публикация фото")
    except Exception as e:
        return format_result(False, str(e), "Публикация фото")

def test_upload_video(account, video_path, caption=""):
    """Тестирует публикацию видео поста"""
    print(f"\n🎥 Тестирование публикации видео: {video_path}...")
    print(f"📝 Подпись: '{caption}'")
    
    if not os.path.exists(video_path):
        return format_result(False, f"Файл не найден: {video_path}", "Публикация видео")
    
    try:
        profile_manager = ProfileManager(account.id)
        success, result = profile_manager.upload_video(video_path, caption)
        
        return format_result(success, result, "Публикация видео")
    except Exception as e:
        return format_result(False, str(e), "Публикация видео")

def create_test_photo():
    """Создает тестовое фото для поста"""
    try:
        from PIL import Image, ImageDraw, ImageFont
        
        # Создаем тестовое изображение 1080x1080 (квадратное для Instagram)
        img = Image.new('RGB', (1080, 1080), color='lightcoral')
        draw = ImageDraw.Draw(img)
        
        # Рисуем простой паттерн
        draw.rectangle([100, 100, 980, 980], fill='white', outline='darkred', width=5)
        
        # Добавляем текст
        try:
            # Пытаемся использовать системный шрифт
            font = ImageFont.truetype("/System/Library/Fonts/Arial.ttf", 80)
        except:
            # Если не найден, используем базовый
            font = ImageFont.load_default()
        
        draw.text((300, 450), "TEST POST", fill='black', font=font)
        draw.text((250, 550), "ФОТО ТЕСТ", fill='black', font=font)
        
        test_photo_path = "test_post_photo.jpg"
        img.save(test_photo_path, "JPEG", quality=90)
        print(f"✅ Создано тестовое фото: {test_photo_path}")
        return test_photo_path
    except ImportError:
        print("❌ Библиотека PIL не установлена. Используйте: pip install Pillow")
        return None
    except Exception as e:
        print(f"❌ Ошибка при создании тестового фото: {e}")
        return None

def create_test_video():
    """Создает тестовое видео для поста"""
    try:
        from moviepy.editor import ColorClip, TextClip, CompositeVideoClip
        
        # Создаем простое видео 15 секунд
        duration = 15
        
        # Фоновый клип
        background = ColorClip(size=(1080, 1080), color=(100, 149, 237), duration=duration)
        
        # Текстовый клип
        txt_clip = TextClip("TEST VIDEO\nВИДЕО ТЕСТ", 
                           fontsize=70, 
                           color='white',
                           font='Arial-Bold')
        txt_clip = txt_clip.set_position('center').set_duration(duration)
        
        # Композитное видео
        video = CompositeVideoClip([background, txt_clip])
        
        test_video_path = "test_post_video.mp4"
        video.write_videofile(test_video_path, fps=24, verbose=False, logger=None)
        
        print(f"✅ Создано тестовое видео: {test_video_path}")
        return test_video_path
    except ImportError:
        print("❌ Библиотека moviepy не установлена. Используйте: pip install moviepy")
        return None
    except Exception as e:
        print(f"❌ Ошибка при создании тестового видео: {e}")
        return None

def main():
    print("🧪 ТЕСТ МОДУЛЯ: profile_setup/post_manager.py")
    print("="*50)
    
    # Получаем тестовый аккаунт
    account = get_test_account()
    if not account:
        return
    
    # Проверяем подключение
    client = test_instagram_connection(account)
    if not client:
        return
    
    # Показываем текущую информацию о постах
    current_posts = test_current_posts(account)
    if current_posts is None:
        return
    
    print("\n" + "="*50)
    print("🎯 ТЕСТИРОВАНИЕ ПУБЛИКАЦИИ ПОСТОВ")
    print("="*50)
    
    print("\nВыберите тест:")
    print("1. Опубликовать тестовое фото")
    print("2. Опубликовать фото из файла")
    print("3. Опубликовать тестовое видео")
    print("4. Опубликовать видео из файла")
    print("5. Полный тест (фото + видео)")
    
    try:
        choice = input("\nВыберите тест (1-5, Enter для пропуска): ").strip()
        
        if choice == "":
            print("\n⏭️ Тест пропущен пользователем")
            return
        elif choice == "1":
            # Создаем и публикуем тестовое фото
            test_photo_path = create_test_photo()
            if test_photo_path:
                caption = "🧪 Тестовый пост - фото создано автоматически для проверки функционала"
                print(f"\n🧪 Тест: публикация тестового фото")
                
                if test_upload_photo(account, test_photo_path, caption):
                    print(f"\n✅ Тест УСПЕШНО - Фото опубликовано")
                    
                    # Проверяем результат
                    print("\n🔍 Проверка изменений...")
                    posts_after = test_current_posts(account)
                    
                    if posts_after and posts_after > current_posts:
                        print("✅ Верификация: Пост успешно добавлен в Instagram!")
                    else:
                        print("⚠️ Верификация: Пост может еще обрабатываться Instagram")
                else:
                    print(f"\n❌ Тест ОШИБКА - Не удалось опубликовать фото")
                
                # Удаляем тестовый файл
                try:
                    os.remove(test_photo_path)
                    print(f"🧹 Тестовый файл {test_photo_path} удален")
                except:
                    pass
        
        elif choice == "2":
            # Используем пользовательский файл фото
            photo_path = input("Введите путь к файлу фото: ").strip()
            caption = input("Введите подпись к посту (или Enter для пропуска): ").strip()
            
            if photo_path:
                print(f"\n🧪 Тест: публикация фото {photo_path}")
                
                if test_upload_photo(account, photo_path, caption):
                    print(f"\n✅ Тест УСПЕШНО - Фото опубликовано")
                else:
                    print(f"\n❌ Тест ОШИБКА - Не удалось опубликовать фото")
        
        elif choice == "3":
            # Создаем и публикуем тестовое видео
            test_video_path = create_test_video()
            if test_video_path:
                caption = "🎥 Тестовое видео - создано автоматически для проверки функционала"
                print(f"\n🧪 Тест: публикация тестового видео")
                
                if test_upload_video(account, test_video_path, caption):
                    print(f"\n✅ Тест УСПЕШНО - Видео опубликовано")
                    
                    # Проверяем результат
                    print("\n🔍 Проверка изменений...")
                    posts_after = test_current_posts(account)
                    
                    if posts_after and posts_after > current_posts:
                        print("✅ Верификация: Видео пост успешно добавлен в Instagram!")
                    else:
                        print("⚠️ Верификация: Пост может еще обрабатываться Instagram")
                else:
                    print(f"\n❌ Тест ОШИБКА - Не удалось опубликовать видео")
                
                # Удаляем тестовый файл
                try:
                    os.remove(test_video_path)
                    print(f"🧹 Тестовый файл {test_video_path} удален")
                except:
                    pass
        
        elif choice == "4":
            # Используем пользовательский файл видео
            video_path = input("Введите путь к файлу видео: ").strip()
            caption = input("Введите подпись к посту (или Enter для пропуска): ").strip()
            
            if video_path:
                print(f"\n🧪 Тест: публикация видео {video_path}")
                
                if test_upload_video(account, video_path, caption):
                    print(f"\n✅ Тест УСПЕШНО - Видео опубликовано")
                else:
                    print(f"\n❌ Тест ОШИБКА - Не удалось опубликовать видео")
        
        elif choice == "5":
            # Полный тест
            print(f"\n🧪 Полный тест: публикация фото и видео")
            
            # 1. Публикуем фото
            test_photo_path = create_test_photo()
            if test_photo_path:
                print("\n📷 Этап 1: Публикация тестового фото")
                caption_photo = "📷 Тестовое фото - часть полного теста публикации"
                
                if test_upload_photo(account, test_photo_path, caption_photo):
                    print("✅ Тестовое фото опубликовано")
                    
                    # 2. Публикуем видео
                    test_video_path = create_test_video()
                    if test_video_path:
                        print("\n🎥 Этап 2: Публикация тестового видео")
                        caption_video = "🎥 Тестовое видео - часть полного теста публикации"
                        
                        if test_upload_video(account, test_video_path, caption_video):
                            print("✅ Тестовое видео опубликовано")
                            print("\n🎉 Полный тест УСПЕШНО завершен!")
                        else:
                            print("❌ Не удалось опубликовать видео")
                        
                        # Удаляем видео файл
                        try:
                            os.remove(test_video_path)
                        except:
                            pass
                else:
                    print("❌ Не удалось опубликовать фото")
                
                # Удаляем фото файл
                try:
                    os.remove(test_photo_path)
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