
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

const studentSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  course: z.string().min(1, 'Veuillez sélectionner une filière'),
  level: z.string().min(1, 'Veuillez sélectionner un niveau'),
  status: z.enum(['Actif', 'En pause']),
});

type StudentFormData = z.infer<typeof studentSchema>;

interface AddStudentFormProps {
  open: boolean;
  onClose: () => void;
}

export const AddStudentForm = ({ open, onClose }: AddStudentFormProps) => {
  const { addStudent, courses } = useApp();
  
  const form = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      name: '',
      email: '',
      course: '',
      level: '',
      status: 'Actif',
    },
  });

  const onSubmit = (data: StudentFormData) => {
    addStudent({
      ...data,
      average: 0,
      joinDate: new Date().toISOString().split('T')[0],
    });
    
    toast({
      title: 'Succès',
      description: 'Étudiant ajouté avec succès',
    });
    
    form.reset();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Ajouter un étudiant</DialogTitle>
          <DialogDescription>
            Remplissez les informations de l'étudiant
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nom complet</Label>
            <Input
              id="name"
              {...form.register('name')}
              placeholder="Ex: Marie Dupont"
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
              placeholder="marie.dupont@email.com"
            />
            {form.formState.errors.email && (
              <p className="text-sm text-red-600">{form.formState.errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Filière</Label>
            <Select onValueChange={(value) => form.setValue('course', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner une filière" />
              </SelectTrigger>
              <SelectContent>
                {courses.map((course) => (
                  <SelectItem key={course.id} value={course.name}>
                    {course.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {form.formState.errors.course && (
              <p className="text-sm text-red-600">{form.formState.errors.course.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Niveau</Label>
            <Select onValueChange={(value) => form.setValue('level', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un niveau" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Niveau 1">Niveau 1</SelectItem>
                <SelectItem value="Niveau 2">Niveau 2</SelectItem>
                <SelectItem value="Niveau 3">Niveau 3</SelectItem>
              </SelectContent>
            </Select>
            {form.formState.errors.level && (
              <p className="text-sm text-red-600">{form.formState.errors.level.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Statut</Label>
            <Select onValueChange={(value) => form.setValue('status', value as 'Actif' | 'En pause')}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Actif">Actif</SelectItem>
                <SelectItem value="En pause">En pause</SelectItem>
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
