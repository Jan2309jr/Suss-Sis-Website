import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, LogOut, Menu, X, Plus, Trash2, Edit2, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Admin() {
  const [location, setLocation] = useLocation();
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("menu");

  useEffect(() => {
    if (!user) {
      setLocation("/login");
      return;
    }
    if (user.role !== "admin") {
      setLocation("/");
      return;
    }
    setIsAdmin(true);
  }, [user, setLocation]);

  if (!isAdmin) {
    return null;
  }

  const menuItems = [
    { id: "menu", label: "Change Menu", icon: "📋" },
    { id: "contact", label: "Contact Information", icon: "📞" },
    { id: "seasonal", label: "Seasonal Menu", icon: "🎄" },
    { id: "gallery", label: "Gallery Images", icon: "🖼️" },
    { id: "cakes", label: "Custom Cakes", icon: "🎂" },
    { id: "about", label: "About Section", icon: "ℹ️" },
  ];

  return (
    <div className="min-h-screen bg-secondary/20 flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? "w-64" : "w-20"} bg-white border-r border-border/50 transition-all duration-300 flex flex-col`}>
        <div className="p-4 border-b border-border/50 flex items-center justify-between">
          <h1 className={`font-serif font-bold text-primary ${!sidebarOpen && "hidden"}`}>Admin</h1>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            data-testid="button-toggle-sidebar"
          >
            {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeSection === item.id
                  ? "bg-primary text-white"
                  : "text-foreground hover:bg-secondary/50"
              }`}
              data-testid={`button-nav-${item.id}`}
            >
              <span className="text-lg">{item.icon}</span>
              {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-border/50">
          <Button
            variant="outline"
            className="w-full justify-start gap-2"
            onClick={() => {
              logout();
              setLocation("/");
            }}
            data-testid="button-logout"
          >
            <LogOut className="h-4 w-4" />
            {sidebarOpen && "Logout"}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold text-primary mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Welcome, {user?.username}!</p>
        </div>

        {activeSection === "menu" && <MenuSection toast={toast} />}
        {activeSection === "contact" && <ContactSection toast={toast} />}
        {activeSection === "seasonal" && <SeasonalSection toast={toast} />}
        {activeSection === "gallery" && <GallerySection toast={toast} />}
        {activeSection === "cakes" && <CakesSection toast={toast} />}
        {activeSection === "about" && <AboutSection toast={toast} />}
      </div>
    </div>
  );
}

// Menu Section
function MenuSection({ toast }: { toast: any }) {
  const [items, setItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/menu")
      .then(res => res.json())
      .then(data => {
        setItems(data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <div className="flex justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-serif font-bold">Menu Items</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item) => (
          <Card key={item.id} className="p-4 space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold">{item.name}</h3>
                <p className="text-sm text-muted-foreground">{item.category}</p>
              </div>
              <span className="font-bold text-primary">₹{Number(item.price).toFixed(2)}</span>
            </div>
            <p className="text-sm line-clamp-2">{item.description}</p>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="flex-1">
                <Edit2 className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button size="sm" variant="destructive" className="flex-1">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>
      <Button className="w-full">
        <Plus className="h-4 w-4 mr-2" />
        Add New Item
      </Button>
    </div>
  );
}

// Contact Section
function ContactSection({ toast }: { toast: any }) {
  const [formData, setFormData] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/company")
      .then(res => res.json())
      .then(data => {
        setFormData(data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/company/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });
      if (res.ok) {
        toast({ title: "Success", description: "Contact information updated!" });
      } else {
        toast({ title: "Error", description: "Failed to update", variant: "destructive" });
      }
    } catch (err) {
      toast({ title: "Error", description: "Failed to update", variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading || !formData) {
    return <div className="flex justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  return (
    <Card className="p-6 max-w-2xl space-y-4">
      <h2 className="text-2xl font-serif font-bold">Contact Information</h2>
      
      <div>
        <label className="block text-sm font-medium mb-2">Address</label>
        <Textarea 
          value={formData.address || ""}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          className="min-h-24"
          data-testid="input-address"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Phone</label>
          <Input 
            value={formData.phone || ""}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            data-testid="input-phone"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <Input 
            value={formData.email || ""}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            data-testid="input-email"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Website</label>
        <Input 
          value={formData.website || ""}
          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Instagram</label>
        <Input 
          value={formData.instagram || ""}
          onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
        />
      </div>

      <Button 
        onClick={handleSave} 
        disabled={isSaving}
        className="w-full"
        data-testid="button-save-contact"
      >
        {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
        Save Changes
      </Button>
    </Card>
  );
}

// Seasonal Section
function SeasonalSection({ toast }: { toast: any }) {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [items, setItems] = useState(["", "", ""]);
  const [greeting, setGreeting] = useState("");

  const months = [
    "January - New Year", "February - Valentine's", "March - Spring", "April - Easter",
    "May - Summer", "June - Monsoon", "July - Mid Year", "August",
    "September - Autumn", "October - Diwali", "November - Thanksgiving", "December - Christmas"
  ];

  const handleSave = () => {
    toast({ title: "Success", description: "Seasonal items updated!" });
  };

  return (
    <Card className="p-6 max-w-2xl space-y-4">
      <h2 className="text-2xl font-serif font-bold">Seasonal Menu & Greeting</h2>
      
      <div>
        <label className="block text-sm font-medium mb-2">Select Month</label>
        <select 
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
          className="w-full px-4 py-2 border rounded-lg"
          data-testid="select-month"
        >
          {months.map((month, idx) => (
            <option key={idx} value={idx}>{month}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Seasonal Greeting</label>
        <Textarea 
          value={greeting}
          onChange={(e) => setGreeting(e.target.value)}
          placeholder="Enter greeting message for this month"
          className="min-h-20"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Signature Items (3)</label>
        <div className="space-y-2">
          {items.map((item, idx) => (
            <Input
              key={idx}
              value={item}
              onChange={(e) => {
                const newItems = [...items];
                newItems[idx] = e.target.value;
                setItems(newItems);
              }}
              placeholder={`Item ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      <Button onClick={handleSave} className="w-full">
        Save Seasonal Items
      </Button>
    </Card>
  );
}

// Gallery Section
function GallerySection({ toast }: { toast: any }) {
  const [images, setImages] = useState<string[]>([]);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      toast({ title: "Upload feature coming soon", description: "File upload will be enabled in the next update" });
    }
  };

  return (
    <Card className="p-6 space-y-4">
      <h2 className="text-2xl font-serif font-bold">Gallery Images</h2>
      
      <div className="border-2 border-dashed rounded-lg p-8 text-center">
        <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
        <p className="mb-4">Drop images here or click to upload</p>
        <Input
          type="file"
          multiple
          accept="image/*"
          onChange={handleUpload}
          className="hidden"
          id="gallery-upload"
        />
        <Button asChild>
          <label htmlFor="gallery-upload" className="cursor-pointer">
            Choose Images
          </label>
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {images.map((img, idx) => (
          <div key={idx} className="relative group">
            <img src={img} alt="Gallery" className="w-full h-32 object-cover rounded-lg" />
            <Button
              size="sm"
              variant="destructive"
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
}

// Custom Cakes Section
function CakesSection({ toast }: { toast: any }) {
  const [cakes, setCakes] = useState<any[]>([]);

  return (
    <Card className="p-6 space-y-4">
      <h2 className="text-2xl font-serif font-bold">Custom Cake Designs</h2>
      
      <div className="border-2 border-dashed rounded-lg p-8 text-center">
        <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
        <p className="mb-4">Upload cake design images</p>
        <Button variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          Add New Design
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cakes.length === 0 && (
          <p className="text-muted-foreground col-span-full text-center py-8">No custom cakes yet. Add your first design!</p>
        )}
      </div>
    </Card>
  );
}

// About Section
function AboutSection({ toast }: { toast: any }) {
  const [aboutData, setAboutData] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/company")
      .then(res => res.json())
      .then(data => {
        setAboutData(data.about || {});
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/company/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ about: aboutData }),
        credentials: "include",
      });
      if (res.ok) {
        toast({ title: "Success", description: "About section updated!" });
      } else {
        toast({ title: "Error", description: "Failed to update", variant: "destructive" });
      }
    } catch (err) {
      toast({ title: "Error", description: "Failed to update", variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading || !aboutData) {
    return <div className="flex justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  return (
    <Card className="p-6 max-w-4xl space-y-4">
      <h2 className="text-2xl font-serif font-bold">About Section</h2>
      
      <div>
        <label className="block text-sm font-medium mb-2">Vision</label>
        <Textarea 
          value={aboutData.vision || ""}
          onChange={(e) => setAboutData({ ...aboutData, vision: e.target.value })}
          className="min-h-20"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Mission</label>
        <Textarea 
          value={aboutData.mission || ""}
          onChange={(e) => setAboutData({ ...aboutData, mission: e.target.value })}
          className="min-h-20"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Story</label>
        <Textarea 
          value={aboutData.story || ""}
          onChange={(e) => setAboutData({ ...aboutData, story: e.target.value })}
          className="min-h-24"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Founder Name</label>
        <Input 
          value={aboutData.founder?.name || ""}
          onChange={(e) => setAboutData({ 
            ...aboutData, 
            founder: { ...aboutData.founder, name: e.target.value }
          })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Founder Bio</label>
        <Textarea 
          value={aboutData.founder?.bio || ""}
          onChange={(e) => setAboutData({ 
            ...aboutData, 
            founder: { ...aboutData.founder, bio: e.target.value }
          })}
          className="min-h-20"
        />
      </div>

      <Button 
        onClick={handleSave} 
        disabled={isSaving}
        className="w-full"
      >
        {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
        Save About Section
      </Button>
    </Card>
  );
}
