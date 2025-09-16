import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { Shield, Leaf, Loader2, Plus } from "lucide-react";
import { fheEncryption, smartContract } from "@/lib/fhe";
import { useAccount } from "wagmi";

const CreateCarbonCredit = () => {
  const [projectType, setProjectType] = useState("");
  const [location, setLocation] = useState("");
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState("");
  const [vintage, setVintage] = useState(new Date().getFullYear().toString());
  const [duration, setDuration] = useState("365");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [transactionHash, setTransactionHash] = useState<string>("");
  const { toast } = useToast();
  const { isConnected } = useAccount();

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!projectType.trim()) {
      newErrors.projectType = "Please enter project type";
    }
    if (!location.trim()) {
      newErrors.location = "Please enter location";
    }
    if (!amount || parseFloat(amount) <= 0) {
      newErrors.amount = "Please enter a valid amount";
    }
    if (!price || parseFloat(price) <= 0) {
      newErrors.price = "Please enter a valid price";
    }
    if (!vintage || parseInt(vintage) < 2020 || parseInt(vintage) > new Date().getFullYear()) {
      newErrors.vintage = "Please enter a valid vintage year";
    }
    if (!duration || parseInt(duration) <= 0) {
      newErrors.duration = "Please enter a valid duration";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateCredit = async () => {
    if (!validateForm()) return;
    if (!isConnected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to create carbon credits",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Encrypt sensitive data using FHE
      const encryptedData = await fheEncryption.encryptSensitiveData({
        amount: parseFloat(amount),
        price: parseFloat(price),
        creditType: projectType,
        vintage: parseInt(vintage)
      });

      // Create encrypted carbon credit on blockchain
      const txHash = await smartContract.createEncryptedCarbonCredit(
        encryptedData,
        {
          projectType,
          location,
          duration: parseInt(duration)
        }
      );

      setTransactionHash(txHash);
      
      toast({
        title: "Encrypted Carbon Credit Created Successfully",
        description: `Carbon credit encrypted and created on blockchain. Transaction: ${txHash.slice(0, 10)}...`,
      });
      
      // Clear form
      setProjectType("");
      setLocation("");
      setAmount("");
      setPrice("");
      setVintage(new Date().getFullYear().toString());
      setDuration("365");
      setErrors({});
      
    } catch (error) {
      console.error('Carbon credit creation error:', error);
      toast({
        title: "Creation Failed",
        description: "Failed to encrypt and create carbon credit. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-gradient-card border-primary/20 shadow-eco">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-earth-green">
          <Plus className="w-5 h-5" />
          Create Encrypted Carbon Credit
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Project Type</label>
            <select 
              value={projectType}
              onChange={(e) => {
                setProjectType(e.target.value);
                if (errors.projectType) setErrors(prev => ({ ...prev, projectType: undefined }));
              }}
              className={`w-full p-2 border rounded-lg bg-background text-foreground ${
                errors.projectType ? "border-destructive" : "border-border"
              }`}
            >
              <option value="">Select project type</option>
              <option value="renewable_energy">Renewable Energy</option>
              <option value="forest_conservation">Forest Conservation</option>
              <option value="carbon_capture">Carbon Capture</option>
              <option value="energy_efficiency">Energy Efficiency</option>
            </select>
            {errors.projectType && (
              <p className="text-sm text-destructive">{errors.projectType}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Location</label>
            <Input
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
                if (errors.location) setErrors(prev => ({ ...prev, location: undefined }));
              }}
              placeholder="Enter location"
              className={`${errors.location ? "border-destructive" : "border-primary/20"}`}
            />
            {errors.location && (
              <p className="text-sm text-destructive">{errors.location}</p>
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
              placeholder="Enter amount"
              className={`${errors.amount ? "border-destructive" : "border-primary/20"}`}
              min="0"
              step="0.1"
            />
            {errors.amount && (
              <p className="text-sm text-destructive">{errors.amount}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Price per ton (USD)</label>
            <Input
              type="number"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
                if (errors.price) setErrors(prev => ({ ...prev, price: undefined }));
              }}
              placeholder="Enter price"
              className={`${errors.price ? "border-destructive" : "border-primary/20"}`}
              min="0"
              step="0.01"
            />
            {errors.price && (
              <p className="text-sm text-destructive">{errors.price}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Vintage Year</label>
            <Input
              type="number"
              value={vintage}
              onChange={(e) => {
                setVintage(e.target.value);
                if (errors.vintage) setErrors(prev => ({ ...prev, vintage: undefined }));
              }}
              placeholder="Enter vintage year"
              className={`${errors.vintage ? "border-destructive" : "border-primary/20"}`}
              min="2020"
              max={new Date().getFullYear()}
            />
            {errors.vintage && (
              <p className="text-sm text-destructive">{errors.vintage}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Duration (days)</label>
            <Input
              type="number"
              value={duration}
              onChange={(e) => {
                setDuration(e.target.value);
                if (errors.duration) setErrors(prev => ({ ...prev, duration: undefined }));
              }}
              placeholder="Enter duration"
              className={`${errors.duration ? "border-destructive" : "border-primary/20"}`}
              min="1"
            />
            {errors.duration && (
              <p className="text-sm text-destructive">{errors.duration}</p>
            )}
          </div>
        </div>

        {transactionHash && (
          <div className="p-3 bg-muted/50 rounded-lg border border-primary/10">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-4 h-4 text-earth-green" />
              <span className="text-sm font-medium text-foreground">Transaction Hash</span>
            </div>
            <div className="text-xs font-mono text-muted-foreground break-all">
              {transactionHash}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Carbon credit encrypted and created on blockchain
            </p>
          </div>
        )}

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button 
              className="w-full bg-gradient-earth text-primary-foreground hover:opacity-90 transition-opacity shadow-eco"
              disabled={!projectType || !location || !amount || !price || isLoading || !isConnected}
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Shield className="w-4 h-4 mr-2" />
              )}
              {!isConnected ? "Connect Wallet First" : "Create Encrypted Carbon Credit"}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Carbon Credit Creation</AlertDialogTitle>
              <AlertDialogDescription className="space-y-2">
                <div>Project Type: <strong>{projectType}</strong></div>
                <div>Location: <strong>{location}</strong></div>
                <div>Amount: <strong>{amount} tons CO2</strong></div>
                <div>Price: <strong>${price} per ton</strong></div>
                <div>Vintage: <strong>{vintage}</strong></div>
                <div>Duration: <strong>{duration} days</strong></div>
                <div className="text-muted-foreground text-sm mt-2">
                  Your carbon credit will be encrypted using FHE technology and submitted to the blockchain. 
                  All sensitive data (amount, price) will be encrypted for privacy protection.
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction 
                onClick={handleCreateCredit}
                className="bg-gradient-earth text-primary-foreground hover:opacity-90"
              >
                Create Encrypted Credit
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
};

export default CreateCarbonCredit;
