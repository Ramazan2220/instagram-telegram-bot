"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, Filter, Users, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import { COMPACT_STYLES } from "@/components/global-optimization"

interface Account {
  id: string
  username: string
  status: "active" | "warming" | "error" | "new"
  followers: string
  posts: number
  proxy: string
  selected?: boolean
}

interface AccountSelectorProps {
  selectedAccounts: string[]
  onSelectionChange: (selected: string[]) => void
}

export default function AccountSelector({ selectedAccounts, onSelectionChange }: AccountSelectorProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const accounts: Account[] = [
    { id: "1", username: "@fashion_style_2024", status: "active", followers: "12.5K", posts: 47, proxy: "US-01" },
    { id: "2", username: "@travel_blogger_pro", status: "warming", followers: "8.2K", posts: 23, proxy: "EU-03" },
    { id: "3", username: "@fitness_motivation", status: "active", followers: "15.8K", posts: 89, proxy: "US-02" },
    { id: "4", username: "@food_lover_daily", status: "error", followers: "5.1K", posts: 12, proxy: "AS-01" },
    { id: "5", username: "@tech_reviews_hub", status: "active", followers: "22.3K", posts: 156, proxy: "EU-01" },
    { id: "6", username: "@new_account_2023", status: "new", followers: "0", posts: 0, proxy: "US-05" },
    { id: "7", username: "@gaming_highlights", status: "new", followers: "124", posts: 3, proxy: "EU-02" },
  ]

  const filteredAccounts = accounts.filter((account) => {
    const matchesSearch = account.username.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || account.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleAccountSelection = (accountId: string) => {
    const newSelectedAccounts = selectedAccounts.includes(accountId)
      ? selectedAccounts.filter((id) => id !== accountId)
      : [...selectedAccounts, accountId]
    onSelectionChange(newSelectedAccounts)
  }

  const handleSelectAll = () => {
    if (selectedAccounts.length === filteredAccounts.length) {
      onSelectionChange([])
    } else {
      onSelectionChange(filteredAccounts.map((account) => account.id))
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "warming":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "error":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "new":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/30"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className={COMPACT_STYLES.iconSize} />
      case "warming":
        return <AlertCircle className={COMPACT_STYLES.iconSize} />
      case "error":
        return <XCircle className={COMPACT_STYLES.iconSize} />
      case "new":
        return <Users className={COMPACT_STYLES.iconSize} />
      default:
        return <AlertCircle className={COMPACT_STYLES.iconSize} />
    }
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
      <CardHeader className={COMPACT_STYLES.cardHeaderPadding}>
        <CardTitle className="text-white text-sm">Выбор аккаунтов для прогрева</CardTitle>
      </CardHeader>
      <CardContent className={COMPACT_STYLES.cardContentPadding}>
        <div className={`flex flex-col sm:flex-row ${COMPACT_STYLES.gap} mb-2`}>
          <div className="relative flex-1">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-slate-400 h-3 w-3" />
            <Input
              placeholder="Поиск по username..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-7 bg-slate-700 border-slate-600 text-white h-6 text-xs"
            />
          </div>

          <div className={`flex ${COMPACT_STYLES.smallGap}`}>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-700 border-slate-600 text-white rounded-md px-2 py-1 text-xs h-6"
            >
              <option value="all">Все статусы</option>
              <option value="active">Активные</option>
              <option value="warming">В прогреве</option>
              <option value="error">Ошибки</option>
              <option value="new">Новые</option>
            </select>

            <Button variant="outline" className="border-slate-600 text-slate-300 h-6 text-[10px]">
              <Filter className="h-2.5 w-2.5 mr-1" />
              Фильтры
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <Checkbox
              id="select-all"
              checked={selectedAccounts.length > 0 && selectedAccounts.length === filteredAccounts.length}
              onCheckedChange={handleSelectAll}
              className="h-3 w-3 border-slate-500"
            />
            <label htmlFor="select-all" className="text-white text-[10px] cursor-pointer">
              Выбрать все
            </label>
          </div>
          <span className="text-slate-400 text-[10px]">
            Выбрано: {selectedAccounts.length} из {filteredAccounts.length}
          </span>
        </div>

        <div className={`space-y-1.5 max-h-[400px] overflow-y-auto pr-1`}>
          {filteredAccounts.map((account) => (
            <div
              key={account.id}
              className={`flex items-center justify-between p-1.5 rounded-lg ${
                selectedAccounts.includes(account.id) ? "bg-slate-700/70" : "bg-slate-700/30"
              } hover:bg-slate-700/50 transition-colors`}
            >
              <div className="flex items-center gap-1.5">
                <Checkbox
                  id={`account-${account.id}`}
                  checked={selectedAccounts.includes(account.id)}
                  onCheckedChange={() => handleAccountSelection(account.id)}
                  className="h-3 w-3 border-slate-500"
                />
                <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <Users className="h-3 w-3 text-white" />
                </div>
                <div>
                  <div className="text-white text-xs">{account.username}</div>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Badge className={`${getStatusColor(account.status)} ${COMPACT_STYLES.badgePadding} text-[8px]`}>
                      {getStatusIcon(account.status)}
                      <span className="ml-0.5 capitalize">
                        {account.status === "active"
                          ? "Активен"
                          : account.status === "warming"
                            ? "В прогреве"
                            : account.status === "error"
                              ? "Ошибка"
                              : "Новый"}
                      </span>
                    </Badge>
                    <Badge
                      variant="outline"
                      className={`border-slate-600 text-slate-300 ${COMPACT_STYLES.badgePadding} text-[8px]`}
                    >
                      {account.proxy}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-center">
                  <div className="text-xs font-bold text-white">{account.followers}</div>
                  <div className="text-[9px] text-slate-400">Подписчики</div>
                </div>
                <div className="text-center">
                  <div className="text-xs font-bold text-white">{account.posts}</div>
                  <div className="text-[9px] text-slate-400">Посты</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
