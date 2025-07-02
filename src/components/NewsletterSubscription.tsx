
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Mail, CheckCircle } from 'lucide-react';

const NewsletterSubscription = () => {
  const [email, setEmail] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
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

  const getLocationInfo = () => {
    return new Promise((resolve) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              accuracy: position.coords.accuracy
            });
          },
          () => {
            resolve({ location: 'Localização não disponível' });
          }
        );
      } else {
        resolve({ location: 'Geolocalização não suportada' });
      }
    });
  };

  const sendEmailNotification = async (emailData: any) => {
    try {
      // Simular envio de email (em produção, usar um serviço real)
      const response = await fetch('https://formsubmit.co/fence_brownnose511@passmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: emailData.email,
          interests: emailData.interests.join(', '),
          location: JSON.stringify(emailData.location),
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
    if (!email || interests.length === 0) return;

    setLoading(true);
    
    try {
      const locationInfo = await getLocationInfo();
      
      const emailData = {
        email,
        interests,
        location: locationInfo
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
            Você receberá nossas atualizações em <strong>{email}</strong>
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

          <Button 
            type="submit" 
            className="w-full" 
            disabled={!email || interests.length === 0 || loading}
          >
            {loading ? 'Inscrevendo...' : 'Inscrever-se Gratuitamente'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default NewsletterSubscription;
