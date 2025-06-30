
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useApp } from '@/contexts/AppContext';
import { toast } from '@/hooks/use-toast';

const teacherSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  speciality: z.string().min(1, 'Veuillez sélectionner une spécialité'),
  phone: z.string().min(10, 'Numéro de téléphone invalide'),
  status: z.enum(['Actif', 'Inactif']),
});

type TeacherFormData = z.infer<typeof teacherSchema>;

interface AddTeacherFormProps {
  open: boolean;
  onClose: () => void;
}

export const AddTeacherForm = ({ open, onClose }: AddTeacherFormProps) => {
  const { addTeacher, courses } = useApp();
  
  const form = useForm<TeacherFormData>({
    resolver: zodResolver(teacherSchema),
    defaultValues: {
      name: '',
      email: '',
      speciality: '',
      phone: '',
      status: 'Actif',
    },
  });

  const onSubmit = (data: TeacherFormData) => {
    const selectedCourse = courses.find(c => c.name === data.speciality);
    
    addTeacher({
      ...data,
      courses: selectedCourse ? [selectedCourse.name] : [],
    });
    
    toast({
      title: 'Succès',
      description: 'Formateur ajouté avec succès',
    });
    
    form.reset();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Ajouter un formateur</DialogTitle>
          <DialogDescription>
            Remplissez les informations du formateur
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nom complet</Label>
            <Input
              id="name"
              {...form.register('name')}
              placeholder="Ex: Dr. Jean Dupont"
            />
            {form.formState.errors.name && (
              <p className="text-sm text-red-600">{form.formState.errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...form.register('email')}
              placeholder="jean.dupont@ecole.com"
            />
            {form.formState.errors.email && (
              <p className="text-sm text-red-600">{form.formState.errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Téléphone</Label>
            <Input
              id="phone"
              {...form.register('phone')}
              placeholder="01 23 45 67 89"
            />
            {form.formState.errors.phone && (
              <p className="text-sm text-red-600">{form.formState.errors.phone.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Spécialité</Label>
            <Select onValueChange={(value) => form.setValue('speciality', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner une spécialité" />
              </SelectTrigger>
              <SelectContent>
                {courses.map((course) => (
                  <SelectItem key={course.id} value={course.name}>
                    {course.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {form.formState.errors.speciality && (
              <p className="text-sm text-red-600">{form.formState.errors.speciality.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Statut</Label>
            <Select onValueChange={(value) => form.setValue('status', value as 'Actif' | 'Inactif')}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Actif">Actif</SelectItem>
                <SelectItem value="Inactif">Inactif</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit">
              Ajouter
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
