"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AddProxyDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddProxyDialog({ open, onOpenChange }: AddProxyDialogProps) {
  const [needsAuth, setNeedsAuth] = useState(false)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-slate-800 text-white border-slate-700 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white text-base">Добавление прокси</DialogTitle>
          <DialogDescription className="text-slate-400 text-xs">
            Добавьте новые прокси-серверы в систему
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
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <Label htmlFor="ip" className="text-white text-xs">
                  IP адрес
                </Label>
                <Input
                  id="ip"
                  placeholder="192.168.1.1"
                  className="bg-slate-700 border-slate-600 text-white h-6 text-xs"
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="port" className="text-white text-xs">
                  Порт
                </Label>
                <Input id="port" placeholder="8080" className="bg-slate-700 border-slate-600 text-white h-6 text-xs" />
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="proxy-type" className="text-white text-xs">
                Тип прокси
              </Label>
              <Select defaultValue="http">
                <SelectTrigger id="proxy-type" className="bg-slate-700 border-slate-600 text-white h-6 text-xs">
                  <SelectValue placeholder="Выберите тип" />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600 text-white">
                  <SelectItem value="http" className="text-xs">
                    HTTP
                  </SelectItem>
                  <SelectItem value="https" className="text-xs">
                    HTTPS
                  </SelectItem>
                  <SelectItem value="socks4" className="text-xs">
                    SOCKS4
                  </SelectItem>
                  <SelectItem value="socks5" className="text-xs">
                    SOCKS5
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label htmlFor="country" className="text-white text-xs">
                Страна
              </Label>
              <Select defaultValue="us">
                <SelectTrigger id="country" className="bg-slate-700 border-slate-600 text-white h-6 text-xs">
                  <SelectValue placeholder="Выберите страну" />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600 text-white">
                  <SelectItem value="us" className="text-xs">
                    США
                  </SelectItem>
                  <SelectItem value="de" className="text-xs">
                    Германия
                  </SelectItem>
                  <SelectItem value="uk" className="text-xs">
                    Великобритания
                  </SelectItem>
                  <SelectItem value="fr" className="text-xs">
                    Франция
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="auth-needed"
                checked={needsAuth}
                onCheckedChange={(checked) => setNeedsAuth(checked as boolean)}
                className="h-3 w-3 border-slate-500"
              />
              <Label htmlFor="auth-needed" className="text-white text-xs cursor-pointer">
                Требуется авторизация
              </Label>
            </div>

            {needsAuth && (
              <div className="grid grid-cols-2 gap-2">
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
              </div>
            )}
          </TabsContent>

          <TabsContent value="bulk" className={`space-y-2`}>
            <div className="space-y-1">
              <Label htmlFor="proxies-list" className="text-white text-xs">
                Список прокси
              </Label>
              <textarea
                id="proxies-list"
                placeholder="192.168.1.1:8080&#10;192.168.1.2:3128&#10;192.168.1.3:80"
                className="w-full h-20 bg-slate-700 border border-slate-600 rounded-md p-1.5 text-white text-xs"
              />
              <p className="text-slate-400 text-[9px]">
                Каждый прокси с новой строки в формате IP:порт или IP:порт:логин:пароль
              </p>
            </div>

            <div className="space-y-1">
              <Label htmlFor="bulk-proxy-type" className="text-white text-xs">
                Тип прокси
              </Label>
              <Select defaultValue="http">
                <SelectTrigger id="bulk-proxy-type" className="bg-slate-700 border-slate-600 text-white h-6 text-xs">
                  <SelectValue placeholder="Выберите тип" />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600 text-white">
                  <SelectItem value="http" className="text-xs">
                    HTTP
                  </SelectItem>
                  <SelectItem value="https" className="text-xs">
                    HTTPS
                  </SelectItem>
                  <SelectItem value="socks4" className="text-xs">
                    SOCKS4
                  </SelectItem>
                  <SelectItem value="socks5" className="text-xs">
                    SOCKS5
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label htmlFor="bulk-country" className="text-white text-xs">
                Страна
              </Label>
              <Select defaultValue="us">
                <SelectTrigger id="bulk-country" className="bg-slate-700 border-slate-600 text-white h-6 text-xs">
                  <SelectValue placeholder="Выберите страну" />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600 text-white">
                  <SelectItem value="us" className="text-xs">
                    США
                  </SelectItem>
                  <SelectItem value="de" className="text-xs">
                    Германия
                  </SelectItem>
                  <SelectItem value="uk" className="text-xs">
                    Великобритания
                  </SelectItem>
                  <SelectItem value="fr" className="text-xs">
                    Франция
                  </SelectItem>
                  <SelectItem value="mixed" className="text-xs">
                    Разные страны
                  </SelectItem>
                </SelectContent>
              </Select>
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
          <Button variant="outline" className="border-slate-600 text-slate-300 h-6 text-[10px]">
            Тест прокси
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 h-6 text-[10px]">Добавить прокси</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
