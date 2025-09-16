import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Shield, TrendingUp, Leaf, Loader2 } from "lucide-react";

const TradingInterface = () => {
  const [showPrice, setShowPrice] = useState(false);
  const [amount, setAmount] = useState("");
  const [tradeType, setTradeType] = useState<"buy" | "sell">("buy");
  const [creditType, setCreditType] = useState("Carbon Offset Credits");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ amount?: string; creditType?: string }>({});
  const { toast } = useToast();

  const validateForm = () => {
    const newErrors: { amount?: string; creditType?: string } = {};
    
    if (!amount || parseFloat(amount) <= 0) {
      newErrors.amount = "请输入有效的数量";
    }
    if (parseFloat(amount) > 10000) {
      newErrors.amount = "单次交易不能超过10,000吨";
    }
    if (!creditType) {
      newErrors.creditType = "请选择信用类型";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "订单提交成功",
        description: `${tradeType === "buy" ? "买入" : "卖出"}订单已提交，等待匹配...`,
      });
      
      // 清空表单
      setAmount("");
      setErrors({});
      
    } catch (error) {
      toast({
        title: "提交失败",
        description: "网络错误，请重试",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const estimatedPrice = amount ? (parseFloat(amount) * 42.5).toFixed(2) : "0.00";

  const mockTrades = [
    { id: 1, type: "buy", amount: "1,250", status: "encrypted", credits: "Carbon Offset Credits" },
    { id: 2, type: "sell", amount: "850", status: "encrypted", credits: "Renewable Energy Credits" },
    { id: 3, type: "buy", amount: "2,100", status: "settled", credits: "Forest Conservation Credits", price: "$45.20" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Trading Form */}
      <Card className="bg-gradient-card border-primary/20 shadow-eco">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-earth-green">
            <Shield className="w-5 h-5" />
            Private Trading
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button
              onClick={() => setTradeType("buy")}
              variant={tradeType === "buy" ? "default" : "outline"}
              className={tradeType === "buy" ? "bg-gradient-earth text-primary-foreground" : ""}
            >
              Buy Credits
            </Button>
            <Button
              onClick={() => setTradeType("sell")}
              variant={tradeType === "sell" ? "default" : "outline"}
              className={tradeType === "sell" ? "bg-gradient-earth text-primary-foreground" : ""}
            >
              Sell Credits
            </Button>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Credit Type</label>
            <select 
              value={creditType}
              onChange={(e) => setCreditType(e.target.value)}
              className={`w-full p-2 border rounded-lg bg-background text-foreground ${
                errors.creditType ? "border-destructive" : "border-border"
              }`}
            >
              <option value="Carbon Offset Credits">Carbon Offset Credits</option>
              <option value="Renewable Energy Credits">Renewable Energy Credits</option>
              <option value="Forest Conservation Credits">Forest Conservation Credits</option>
            </select>
            {errors.creditType && (
              <p className="text-sm text-destructive">{errors.creditType}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Amount (tons CO2)</label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                if (errors.amount) setErrors(prev => ({ ...prev, amount: undefined }));
              }}
              placeholder="输入数量"
              className={`${errors.amount ? "border-destructive" : "border-primary/20"}`}
              min="0"
              max="10000"
              step="0.1"
            />
            {errors.amount && (
              <p className="text-sm text-destructive">{errors.amount}</p>
            )}
          </div>

          <div className="p-4 bg-muted/50 rounded-lg border border-primary/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-muted-foreground">Estimated Price</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowPrice(!showPrice)}
                className="p-1 h-auto"
              >
                {showPrice ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </div>
            <div className="text-lg font-bold text-foreground">
              {showPrice ? `$${estimatedPrice}` : "••••••••"}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Price revealed only after settlement
            </p>
          </div>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button 
                className="w-full bg-gradient-earth text-primary-foreground hover:opacity-90 transition-opacity shadow-eco"
                disabled={!amount || parseFloat(amount) <= 0 || isLoading}
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Leaf className="w-4 h-4 mr-2" />
                )}
                {tradeType === "buy" ? "提交买单" : "提交卖单"}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>确认订单</AlertDialogTitle>
                <AlertDialogDescription className="space-y-2">
                  <div>交易类型: <strong>{tradeType === "buy" ? "买入" : "卖出"}</strong></div>
                  <div>信用类型: <strong>{creditType}</strong></div>
                  <div>数量: <strong>{amount} 吨CO2</strong></div>
                  <div>预估价格: <strong>${estimatedPrice}</strong></div>
                  <div className="text-muted-foreground text-sm mt-2">
                    实际价格将在结算后公布，采用加密定价保护您的隐私。
                  </div>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>取消</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={handlePlaceOrder}
                  className="bg-gradient-earth text-primary-foreground hover:opacity-90"
                >
                  确认提交
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>

      {/* Active Trades */}
      <Card className="bg-gradient-card border-primary/20 shadow-eco">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-earth-green">
            <TrendingUp className="w-5 h-5" />
            Active Trades
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockTrades.map((trade) => (
              <div
                key={trade.id}
                className="p-3 bg-background/50 rounded-lg border border-primary/10 hover:shadow-eco transition-shadow"
              >
                <div className="flex items-center justify-between mb-2">
                  <Badge
                    variant={trade.type === "buy" ? "default" : "secondary"}
                    className={trade.type === "buy" ? "bg-emerald text-white" : "bg-accent text-accent-foreground"}
                  >
                    {trade.type.toUpperCase()}
                  </Badge>
                  <Badge
                    variant={trade.status === "encrypted" ? "outline" : "default"}
                    className={trade.status === "encrypted" ? "border-muted-foreground" : "bg-earth-green text-white"}
                  >
                    {trade.status === "encrypted" ? (
                      <>
                        <Shield className="w-3 h-3 mr-1" />
                        Encrypted
                      </>
                    ) : (
                      "Settled"
                    )}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">{trade.credits}</div>
                <div className="flex items-center justify-between mt-2">
                  <span className="font-medium text-foreground">{trade.amount} tons</span>
                  <span className="text-sm text-foreground">
                    {trade.status === "encrypted" ? "••••••••" : trade.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TradingInterface;