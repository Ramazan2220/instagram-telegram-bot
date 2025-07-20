"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"

interface AccountFiltersDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AccountFiltersDialog({ open, onOpenChange }: AccountFiltersDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-slate-800 text-white border-slate-700 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white text-base">Фильтры аккаунтов</DialogTitle>
          <DialogDescription className="text-slate-400 text-xs">
            Настройте фильтры для отображения нужных аккаунтов
          </DialogDescription>
        </DialogHeader>

        <div className={`space-y-3`}>
          <div className="space-y-1">
            <Label className="text-white text-xs">Статус аккаунта</Label>
            <div className="grid grid-cols-2 gap-1">
              <div className="flex items-center space-x-2">
                <Checkbox id="active" defaultChecked className="h-3 w-3 border-slate-500" />
                <Label htmlFor="active" className="text-white text-xs cursor-pointer">
                  Активные
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="warming" defaultChecked className="h-3 w-3 border-slate-500" />
                <Label htmlFor="warming" className="text-white text-xs cursor-pointer">
                  В прогреве
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="error" defaultChecked className="h-3 w-3 border-slate-500" />
                <Label htmlFor="error" className="text-white text-xs cursor-pointer">
                  С ошибками
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="new" defaultChecked className="h-3 w-3 border-slate-500" />
                <Label htmlFor="new" className="text-white text-xs cursor-pointer">
                  Новые
                </Label>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <Label className="text-white text-xs">Прокси</Label>
            <div className="grid grid-cols-2 gap-1">
              <div className="flex items-center space-x-2">
                <Checkbox id="us-proxy" defaultChecked className="h-3 w-3 border-slate-500" />
                <Label htmlFor="us-proxy" className="text-white text-xs cursor-pointer">
                  US прокси
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="eu-proxy" defaultChecked className="h-3 w-3 border-slate-500" />
                <Label htmlFor="eu-proxy" className="text-white text-xs cursor-pointer">
                  EU прокси
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="as-proxy" defaultChecked className="h-3 w-3 border-slate-500" />
                <Label htmlFor="as-proxy" className="text-white text-xs cursor-pointer">
                  AS прокси
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="no-proxy" defaultChecked className="h-3 w-3 border-slate-500" />
                <Label htmlFor="no-proxy" className="text-white text-xs cursor-pointer">
                  Без прокси
                </Label>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <Label htmlFor="followers-range" className="text-white text-xs">
                Количество подписчиков
              </Label>
              <span className="text-white text-xs font-medium">0 - 50K+</span>
            </div>
            <Slider id="followers-range" defaultValue={[0, 100]} max={100} step={1} className="py-1" />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>0</span>
              <span>10K</span>
              <span>50K+</span>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <Label htmlFor="posts-range" className="text-white text-xs">
                Количество постов
              </Label>
              <span className="text-white text-xs font-medium">0 - 500+</span>
            </div>
            <Slider id="posts-range" defaultValue={[0, 100]} max={100} step={1} className="py-1" />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>0</span>
              <span>100</span>
              <span>500+</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-1 mt-2">
          <Button variant="outline" className="border-slate-600 text-slate-300 h-6 text-[10px]">
            Сбросить
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 h-6 text-[10px]" onClick={() => onOpenChange(false)}>
            Применить фильтры
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
