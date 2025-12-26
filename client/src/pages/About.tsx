import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Heart, Users, Lightbulb, Leaf } from "lucide-react";

export default function About() {
  const { data: companyConfig } = useQuery({
    queryKey: ["/api/company"],
    queryFn: async () => {
      const response = await fetch("/api/company");
      return response.json();
    }
  });

  if (!companyConfig) return <div className="p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-[hsl(var(--background))]">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#FFF8F5] to-[#FFFBF9] py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-serif font-bold text-[#5A3A3A] mb-4">
            About {companyConfig.name}
          </h1>
          <p className="text-xl text-[#7A5555] mb-8">
            {companyConfig.tagline}
          </p>
          <p className="text-lg text-[#8A6565] leading-relaxed">
            {companyConfig.description}
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-serif font-bold text-[#5A3A3A] mb-8 text-center">
            Our Story
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            {companyConfig.about.story}
          </p>
          
          {/* Founder Section */}
          <Card className="p-8 bg-[#FFF8F5] border-[#D4A5A5] mb-8">
            <div className="mb-4">
              <h3 className="text-2xl font-serif font-bold text-[#5A3A3A] mb-2">
                Founded by {companyConfig.about.founder.name}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {companyConfig.about.founder.bio}
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 px-4 bg-[#FFFBF9]">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 border-[#D4A5A5]">
              <h3 className="text-2xl font-serif font-bold text-[#5A3A3A] mb-4">
                Our Vision
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {companyConfig.about.vision}
              </p>
            </Card>
            <Card className="p-8 border-[#D4A5A5]">
              <h3 className="text-2xl font-serif font-bold text-[#5A3A3A] mb-4">
                Our Mission
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {companyConfig.about.mission}
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-serif font-bold text-[#5A3A3A] mb-12 text-center">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {companyConfig.about.values.map((value: any, idx: number) => {
              const icons = [
                <Heart key={0} className="w-8 h-8 text-[#8B4242]" />,
                <Lightbulb key={1} className="w-8 h-8 text-[#8B4242]" />,
                <Users key={2} className="w-8 h-8 text-[#8B4242]" />,
                <Leaf key={3} className="w-8 h-8 text-[#8B4242]" />
              ];
              return (
                <Card key={idx} className="p-6 border-[#D4A5A5] hover-elevate">
                  <div className="flex items-start gap-4">
                    <div className="mt-1">{icons[idx]}</div>
                    <div>
                      <h3 className="text-xl font-serif font-bold text-[#5A3A3A] mb-2">
                        {value.title}
                      </h3>
                      <p className="text-gray-700">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Kitchen & Quality */}
      <section className="py-16 px-4 bg-[#FFFBF9]">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 border-[#D4A5A5]">
            <h2 className="text-3xl font-serif font-bold text-[#5A3A3A] mb-4">
              {companyConfig.about.kitchen.title}
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              {companyConfig.about.kitchen.description}
            </p>
          </Card>
        </div>
      </section>

      {/* Community */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 border-[#D4A5A5] bg-gradient-to-br from-[#FFF8F5] to-white">
            <h2 className="text-3xl font-serif font-bold text-[#5A3A3A] mb-4">
              {companyConfig.about.community.title}
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              {companyConfig.about.community.description}
            </p>
          </Card>
        </div>
      </section>

      {/* Specializations */}
      <section className="py-16 px-4 bg-[#FFFBF9]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-serif font-bold text-[#5A3A3A] mb-12 text-center">
            What We Specialize In
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {companyConfig.specializations.map((spec: string, idx: number) => (
              <div key={idx} className="p-6 bg-white border border-[#D4A5A5] rounded-md">
                <p className="text-lg font-semibold text-[#5A3A3A]">
                  ✓ {spec}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-serif font-bold text-[#5A3A3A] mb-12 text-center">
            Visit Us
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 text-center border-[#D4A5A5]">
              <h3 className="text-xl font-semibold text-[#5A3A3A] mb-2">Address</h3>
              <p className="text-gray-700 leading-relaxed">
                {companyConfig.address}
              </p>
            </Card>
            <Card className="p-8 text-center border-[#D4A5A5]">
              <h3 className="text-xl font-semibold text-[#5A3A3A] mb-2">Phone</h3>
              <p className="text-gray-700">
                <a href={`tel:${companyConfig.phone}`} className="text-[#8B4242] hover:underline">
                  {companyConfig.phone}
                </a>
              </p>
            </Card>
            <Card className="p-8 text-center border-[#D4A5A5]">
              <h3 className="text-xl font-semibold text-[#5A3A3A] mb-2">Email</h3>
              <p className="text-gray-700">
                <a href={`mailto:${companyConfig.email}`} className="text-[#8B4242] hover:underline">
                  {companyConfig.email}
                </a>
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Hours */}
      <section className="py-16 px-4 bg-[#FFFBF9]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-[#5A3A3A] mb-8 text-center">
            Opening Hours
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white border border-[#E8D4D4] rounded-lg p-6">
              <h3 className="text-xl font-semibold text-[#5A3A3A] mb-4 text-center">Weekdays</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-700">Monday - Friday</span>
                  <span className="font-semibold text-[#5A3A3A]">{companyConfig.hours.monday}</span>
                </div>
              </div>
            </div>
            <div className="bg-white border border-[#E8D4D4] rounded-lg p-6">
              <h3 className="text-xl font-semibold text-[#5A3A3A] mb-4 text-center">Weekends</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-700">Saturday</span>
                  <span className="font-semibold text-[#5A3A3A]">{companyConfig.hours.saturday}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Sunday</span>
                  <span className="font-semibold text-[#5A3A3A]">{companyConfig.hours.sunday}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
