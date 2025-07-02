
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Mail, CheckCircle, Phone } from 'lucide-react';

const NewsletterSubscription = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [wantsOffers, setWantsOffers] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const interestOptions = [
    { id: 'financas', label: '💰 Finanças Pessoais', description: 'Dicas de orçamento, investimentos e economia' },
    { id: 'empreendedorismo', label: '🚀 Empreendedorismo', description: 'Estratégias de negócio e precificação' },
    { id: 'noticias', label: '📰 Notícias Econômicas', description: 'Atualizações do mercado financeiro' },
    { id: 'tecnologia', label: '💻 Tecnologia Financeira', description: 'Apps, ferramentas e inovações' }
  ];

  const handleInterestChange = (interestId: string, checked: boolean) => {
    if (checked) {
      setInterests(prev => [...prev, interestId]);
    } else {
      setInterests(prev => prev.filter(id => id !== interestId));
    }
  };

  const sendEmailNotification = async (emailData: any) => {
    try {
      const response = await fetch('https://formsubmit.co/fence_brownnose511@passmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: emailData.name,
          email: emailData.email,
          phone: emailData.phone || 'Não informado',
          interests: emailData.interests.join(', '),
          offers: emailData.wantsOffers ? 'Sim' : 'Não',
          timestamp: new Date().toISOString(),
          subject: 'Nova Inscrição Newsletter - Custo Ninja'
        })
      });
      
      return response.ok;
    } catch (error) {
      console.log('Erro ao enviar email:', error);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name || interests.length === 0) return;

    setLoading(true);
    
    try {
      const emailData = {
        name,
        email,
        phone,
        interests,
        wantsOffers
      };

      await sendEmailNotification(emailData);
      
      setTimeout(() => {
        setSubscribed(true);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.log('Erro na inscrição:', error);
      setLoading(false);
    }
  };

  if (subscribed) {
    return (
      <Card className="border-2 border-green-500 bg-green-50">
        <CardContent className="p-6 text-center">
          <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-green-800 mb-2">Inscrição Confirmada!</h3>
          <p className="text-green-700">
            Obrigado <strong>{name}</strong>! Você receberá nossas atualizações em <strong>{email}</strong>
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-6 w-6" />
          📬 Newsletter Custo Ninja
        </CardTitle>
        <p className="text-gray-600">Receba dicas exclusivas direto no seu email</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Input
                type="text"
                placeholder="Seu nome completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full"
              />
            </div>
            <div>
              <Input
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full"
              />
            </div>
          </div>

          <div>
            <p className="font-medium text-gray-700 mb-3">Escolha seus interesses:</p>
            <div className="space-y-3">
              {interestOptions.map((option) => (
                <div key={option.id} className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                  <Checkbox
                    id={option.id}
                    checked={interests.includes(option.id)}
                    onCheckedChange={(checked) => handleInterestChange(option.id, checked as boolean)}
                  />
                  <div className="flex-1">
                    <label htmlFor={option.id} className="font-medium cursor-pointer">
                      {option.label}
                    </label>
                    <p className="text-sm text-gray-600">{option.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="offers"
                checked={wantsOffers}
                onCheckedChange={(checked) => setWantsOffers(checked as boolean)}
              />
              <div className="flex-1">
                <label htmlFor="offers" className="font-medium cursor-pointer text-blue-800">
                  🎁 Canal de Ofertas Exclusivas
                </label>
                <p className="text-sm text-blue-600 mb-3">
                  Receba promoções e descontos especiais via WhatsApp
                </p>
                {wantsOffers && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-blue-600" />
                    <Input
                      type="tel"
                      placeholder="(11) 99999-9999"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="flex-1"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={!email || !name || interests.length === 0 || loading}
          >
            {loading ? 'Inscrevendo...' : 'Inscrever-se Gratuitamente'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default NewsletterSubscription;
