"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AddAccountDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddAccountDialog({ open, onOpenChange }: AddAccountDialogProps) {
  const [enableWarmup, setEnableWarmup] = useState(true)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-slate-800 text-white border-slate-700 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white text-base">Добавление аккаунтов</DialogTitle>
          <DialogDescription className="text-slate-400 text-xs">
            Добавьте новые Instagram аккаунты в систему
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="manual" className="w-full">
          <TabsList className="bg-slate-700 h-6 mb-2">
            <TabsTrigger value="manual" className="data-[state=active]:bg-blue-600 text-[10px] h-4 px-1.5">
              Вручную
            </TabsTrigger>
            <TabsTrigger value="bulk" className="data-[state=active]:bg-green-600 text-[10px] h-4 px-1.5">
              Массовое добавление
            </TabsTrigger>
          </TabsList>

          <TabsContent value="manual" className={`space-y-2`}>
            <div className="space-y-1">
              <Label htmlFor="username" className="text-white text-xs">
                Логин
              </Label>
              <Input
                id="username"
                placeholder="username"
                className="bg-slate-700 border-slate-600 text-white h-6 text-xs"
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="password" className="text-white text-xs">
                Пароль
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="bg-slate-700 border-slate-600 text-white h-6 text-xs"
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="proxy" className="text-white text-xs">
                Прокси
              </Label>
              <Select>
                <SelectTrigger id="proxy" className="bg-slate-700 border-slate-600 text-white h-6 text-xs">
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
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="warmup"
                checked={enableWarmup}
                onCheckedChange={(checked) => setEnableWarmup(checked as boolean)}
                className="h-3 w-3 border-slate-500"
              />
              <Label htmlFor="warmup" className="text-white text-xs cursor-pointer">
                Автоматически запустить прогрев
              </Label>
            </div>
          </TabsContent>

          <TabsContent value="bulk" className={`space-y-2`}>
            <div className="space-y-1">
              <Label htmlFor="accounts-list" className="text-white text-xs">
                Список аккаунтов (логин:пароль)
              </Label>
              <textarea
                id="accounts-list"
                placeholder="username1:password1&#10;username2:password2&#10;username3:password3"
                className="w-full h-20 bg-slate-700 border border-slate-600 rounded-md p-1.5 text-white text-xs"
              />
              <p className="text-slate-400 text-[9px]">Каждый аккаунт с новой строки в формате логин:пароль</p>
            </div>

            <div className="space-y-1">
              <Label htmlFor="bulk-proxy" className="text-white text-xs">
                Прокси для всех аккаунтов
              </Label>
              <Select>
                <SelectTrigger id="bulk-proxy" className="bg-slate-700 border-slate-600 text-white h-6 text-xs">
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
              <Checkbox
                id="bulk-warmup"
                checked={enableWarmup}
                onCheckedChange={(checked) => setEnableWarmup(checked as boolean)}
                className="h-3 w-3 border-slate-500"
              />
              <Label htmlFor="bulk-warmup" className="text-white text-xs cursor-pointer">
                Автоматически запустить прогрев для всех аккаунтов
              </Label>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-1 mt-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-slate-600 text-slate-300 h-6 text-[10px]"
          >
            Отмена
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 h-6 text-[10px]">Добавить аккаунты</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
