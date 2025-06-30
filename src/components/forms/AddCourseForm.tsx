
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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

const courseSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  description: z.string().min(10, 'La description doit contenir au moins 10 caractères'),
  duration: z.string().min(1, 'Veuillez indiquer la durée'),
  level: z.string().min(1, 'Veuillez sélectionner un niveau'),
});

type CourseFormData = z.infer<typeof courseSchema>;

interface AddCourseFormProps {
  open: boolean;
  onClose: () => void;
}

export const AddCourseForm = ({ open, onClose }: AddCourseFormProps) => {
  const { addCourse } = useApp();
  
  const form = useForm<CourseFormData>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      name: '',
      description: '',
      duration: '',
      level: '',
    },
  });

  const onSubmit = (data: CourseFormData) => {
    addCourse({
      ...data,
      studentsCount: 0,
    });
    
    toast({
      title: 'Succès',
      description: 'Filière créée avec succès',
    });
    
    form.reset();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Créer une filière</DialogTitle>
          <DialogDescription>
            Remplissez les informations de la nouvelle filière
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nom de la filière</Label>
            <Input
              id="name"
              {...form.register('name')}
              placeholder="Ex: Développement Web"
            />
            {form.formState.errors.name && (
              <p className="text-sm text-red-600">{form.formState.errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...form.register('description')}
              placeholder="Décrivez le contenu de la formation..."
              rows={3}
            />
            {form.formState.errors.description && (
              <p className="text-sm text-red-600">{form.formState.errors.description.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration">Durée</Label>
            <Input
              id="duration"
              {...form.register('duration')}
              placeholder="Ex: 12 mois"
            />
            {form.formState.errors.duration && (
              <p className="text-sm text-red-600">{form.formState.errors.duration.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Niveau</Label>
            <Select onValueChange={(value) => form.setValue('level', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un niveau" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Débutant">Débutant</SelectItem>
                <SelectItem value="Intermédiaire">Intermédiaire</SelectItem>
                <SelectItem value="Avancé">Avancé</SelectItem>
                <SelectItem value="Débutant à Avancé">Débutant à Avancé</SelectItem>
              </SelectContent>
            </Select>
            {form.formState.errors.level && (
              <p className="text-sm text-red-600">{form.formState.errors.level.message}</p>
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit">
              Créer
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
