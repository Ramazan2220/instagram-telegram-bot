"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload } from "lucide-react"

interface ImportAccountsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ImportAccountsDialog({ open, onOpenChange }: ImportAccountsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-slate-800 text-white border-slate-700 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white text-base">Импорт аккаунтов</DialogTitle>
          <DialogDescription className="text-slate-400 text-xs">
            Импортируйте аккаунты из CSV или TXT файла
          </DialogDescription>
        </DialogHeader>

        <div className={`space-y-3`}>
          <div className="border-2 border-dashed border-slate-600 rounded-lg p-3 text-center">
            <Upload className="h-5 w-5 mx-auto text-slate-400 mb-1" />
            <p className="text-white text-xs">Перетащите файл сюда или нажмите для выбора</p>
            <p className="text-slate-400 text-[9px] mt-0.5">Поддерживаются форматы CSV и TXT</p>
            <input type="file" className="hidden" accept=".csv,.txt" />
            <Button className="bg-blue-600 hover:bg-blue-700 h-6 text-[10px] mt-2">Выбрать файл</Button>
          </div>

          <div className="space-y-1">
            <Label htmlFor="file-format" className="text-white text-xs">
              Формат файла
            </Label>
            <Select defaultValue="login-password">
              <SelectTrigger id="file-format" className="bg-slate-700 border-slate-600 text-white h-6 text-xs">
                <SelectValue placeholder="Выберите формат" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600 text-white">
                <SelectItem value="login-password" className="text-xs">
                  логин:пароль
                </SelectItem>
                <SelectItem value="login-password-proxy" className="text-xs">
                  логин:пароль:прокси
                </SelectItem>
                <SelectItem value="login-password-proxy-useragent" className="text-xs">
                  логин:пароль:прокси:useragent
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <Label htmlFor="default-proxy" className="text-white text-xs">
              Прокси по умолчанию (если не указан в файле)
            </Label>
            <Select>
              <SelectTrigger id="default-proxy" className="bg-slate-700 border-slate-600 text-white h-6 text-xs">
                <SelectValue placeholder="Выберите прокси" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600 text-white">
                <SelectItem value="us-01" className="text-xs">
                  US-01 (192.168.1.1:8080)
                </SelectItem>
                <SelectItem value="eu-01" className="text-xs">
                  EU-01 (192.168.1.2:3128)
                </SelectItem>
                <SelectItem value="auto" className="text-xs">
                  Автоматический выбор
                </SelectItem>
                <SelectItem value="random" className="text-xs">
                  Случайное распределение
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="import-warmup" defaultChecked className="h-3 w-3 border-slate-500" />
            <Label htmlFor="import-warmup" className="text-white text-xs cursor-pointer">
              Автоматически запустить прогрев для импортированных аккаунтов
            </Label>
          </div>
        </div>

        <div className="flex justify-end gap-1 mt-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-slate-600 text-slate-300 h-6 text-[10px]"
          >
            Отмена
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 h-6 text-[10px]">Импортировать</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
